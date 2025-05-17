import { type Errors, Json } from "ox";
import { useState, useEffect } from "react";
import { type Log, decodeEventLog, encodeFunctionData } from "viem";
import { useAccount, useSendCalls, useCallsStatus } from "wagmi";
import EscrowFactory from "../contracts/EscrowFactory";
import { useEscrowStore } from "../store/escrow-store";
import { truncateHexString } from "../utils";
import { Button } from "@ariakit/react";

const buttonClassName = "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50";

export function CreateEscrow() {
	const { address } = useAccount();
	const { addEvent } = useEscrowStore();

	const { data: id, error, isPending, sendCalls } = useSendCalls();
	const {
		data: callsStatusData,
		isLoading: isConfirming,
		isSuccess: isConfirmed,
	} = useCallsStatus({
		id: id?.id as string,
		query: {
			enabled: !!id,
			refetchInterval: (query) => {
				if (query.state.data?.status === "success") return false;
				return 1_000;
			},
		},
	});

	const [transactions, setTransactions] = useState<Set<string>>(new Set());

	useEffect(() => {
		if (!address || callsStatusData?.status !== "success") return;
		const receipts = (
			callsStatusData as {
				receipts?: { transactionHash?: string; logs?: Log[] }[];
			} | undefined
		)?.receipts ?? [];
		const hashes = receipts
			.map((r) => r.transactionHash)
			.filter((h): h is string => Boolean(h));
		if (hashes.length) {
			setTransactions((prev) => new Set([...prev, ...hashes]));
		}

		for (const receipt of receipts) {
			for (const log of receipt.logs ?? []) {
				if (
					log.address.toLowerCase() !== EscrowFactory.address.toLowerCase()
				)
					continue;

				try {
					const { args } = decodeEventLog({
						abi: EscrowFactory.abi,
						data: log.data,
						topics: log.topics,
					});
					// viem may return args as an array or object; we assume object here.
					// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
					const argObj = args as unknown as Record<string, unknown>;
					const escrowAddress = argObj.escrowAddress as `0x${string}`;
					const payee = argObj.payee as `0x${string}`;
					const storefront = argObj.storefront as `0x${string}`;
					const arbiter = argObj.arbiter as `0x${string}`;

					addEvent(address, {
						escrowAddress,
						payee,
						storefront,
						arbiter,
						blockNumber: log.blockNumber ?? undefined,
						transactionHash: receipt.transactionHash as `0x${string}`,
					});

					console.info("[CreateEscrow] Decoded EscrowCreated from receipt", {
						escrowAddress,
						payee,
						storefront,
						arbiter,
					});
				} catch {
					// ignore decoding errors
				}
			}
		}
	}, [callsStatusData, addEvent, address]);

	// Track callsStatusData updates
	useEffect(() => {
		if (callsStatusData?.status !== "success") return;
		// eslint-disable-next-line no-console
		console.info("[CreateEscrow] callsStatusData", callsStatusData);
	}, [callsStatusData]);

	// Additional log for each status change
	useEffect(() => {
		if (!id?.id) return;
		// eslint-disable-next-line no-console
		console.debug("[CreateEscrow] Status update", {
			id: id.id,
			isConfirming,
			isConfirmed,
		});
	}, [id?.id, isConfirming, isConfirmed]);

	if (!address) return null;

	const calldata = encodeFunctionData({
		abi: EscrowFactory.abi,
		functionName: "createEscrow",
		args: [address, address, address],
	});

	return (
		<div>
			<h3>[client] Create Escrow</h3>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					// eslint-disable-next-line no-console
					console.info("[CreateEscrow] Submitting sendCalls", { data: calldata });
					sendCalls({
						calls: [
							{
								data: calldata,
								to: EscrowFactory.address,
							},
						],
					});
				}}
			>
				<Button
					type="submit"
					disabled={isPending}
					className={buttonClassName}
					style={{ marginBottom: "5px" }}
				>
					{isPending ? "Confirming..." : "Create Escrow"}
				</Button>
			</form>
			<ul style={{ listStyleType: "none", padding: 0 }}>
				{Array.from(transactions).map((tx) => (
					<li key={tx}>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`https://sepolia.basescan.org/tx/${tx}`}
						>
							{tx}
						</a>
					</li>
				))}
			</ul>
			<p>{isConfirming && "Waiting for confirmation..."}</p>
			<p>{isConfirmed && "Transaction confirmed."}</p>
			{error && (
				<div>
					Error: {(error as Errors.BaseError).shortMessage || error.message}
				</div>
			)}
			{id && (
				<details style={{ marginTop: "5px" }}>
					<summary>
						<span style={{ marginRight: "8px" }}>useSendCalls response:</span>
						{truncateHexString({
							address:
								typeof id === "string" ? id : (id as { id: string }).id,
							length: 12,
						})}
					</summary>
					<pre>{Json.stringify(id, undefined, 2)}</pre>
				</details>
			)}
		</div>
	);
}
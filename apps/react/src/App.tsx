import { Hooks } from "porto/wagmi";
import { exp1Address, exp1Config } from "./contracts/contracts.ts";
import { useAccount, useConnectors } from "wagmi";
import { truncateHexString } from "./utils.ts";
import { type Errors, Json } from "ox";
import { permissions } from "./constants.ts";
import {
	useEffect,
	useState,
} from "react";
import {
	useCallsStatus,
	useSendCalls,
} from "wagmi";
import {
	encodeFunctionData,
	parseEther,
	type Log,
	decodeEventLog,
} from "viem";
import { Button as AriakitButton } from "@ariakit/react";
import EscrowFactory from "./contracts/EscrowFactory.ts";
import { useEscrowStore } from "./store/escrow-store.ts";
import { useExpBalance } from "./lib/Balance.ts";
import { EscrowList } from "./components/EscrowList.tsx";
import { Account } from "./components/Account.tsx";
import { useAccountInfo, useLogin, useSignup, useLogout } from "./lib/Account.ts";

// Define button style for reuse
const buttonClassName = "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50";

const key = () =>
	({
		expiry: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
		permissions: {
			calls: [
				{
					to: exp1Address,
				},
			],
			spend: [
				{
					limit: parseEther("50"),
					period: "minute",
					token: exp1Address,
				},
			],
		},
	}) as const;

	
const key2 = () =>
	({
		expiry: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
		permissions: {
			calls: [
				{
					to: EscrowFactory.address,
				},
			],
      		spend: [
				{
					limit: parseEther("50"),
					period: "minute",
					token: exp1Address,
				},
			],
		},
	}) as const;

export function App() {
	const label = `local-protocol-${Math.floor(Date.now() / 1_000)}`;
	const [grantPermissions, setGrantPermissions] = useState<boolean>(true);

	const { connector, address, latestPermissions } = useAccountInfo();
	const loginMutation = useLogin();
	const signupMutation = useSignup();
	const logoutMutation = useLogout();

	const isConnectPending = loginMutation.isPending || signupMutation.isPending;
	const isDisconnectPending = logoutMutation.isPending;
	const connectStatus = loginMutation.status !== "idle" ? loginMutation.status : signupMutation.status;
	const connectError = loginMutation.error || signupMutation.error;

	return (
		<main className="p-4 bg-gray-100 min-h-screen">
			<hr />
			<Account error={connectError?.message}>
				<Account.Header status={connectStatus} />
				
				<Account.Controls
					grantPermissions={grantPermissions}
					onTogglePermissions={() => setGrantPermissions(prev => !prev)}
				/>

				<div className="flex gap-2">
					{connector && !address && (
						<>
							<Account.Login
								isConnectPending={isConnectPending}
								onLogin={() => loginMutation.login({ grantPermissions })}
							/>
							<Account.Signup
								isConnectPending={isConnectPending}
								onSignup={() => signupMutation.signup({ grantPermissions, label })}
							/>
						</>
					)}
					{address && (
						<>
							<Account.Address address={address} />
							<Account.Logout
								isDisconnectPending={isDisconnectPending}
								onLogout={logoutMutation.logout}
							/>
						</>
					)}
				</div>

				{address && latestPermissions && (
					<Account.Details
						publicKey={latestPermissions.key.publicKey}
						expiry={latestPermissions.expiry}
						id={latestPermissions.id}
						permissions={latestPermissions}
					/>
				)}
			</Account>
			<hr />
			<GrantCreateEscrowPermissions />
			<hr />
			<Mint />
			<hr />
			<CreateEscrow />
			<hr />
			<EscrowList />
		</main>
	);
}


function GrantCreateEscrowPermissions() {
	const grantPermissions = Hooks.useGrantPermissions();

	return (
		<div>
			<h2>Grant Permissions to Create Escrow</h2>
			<AriakitButton 
				onClick={() => grantPermissions.mutate(key2())} 
				type="button"
				className={buttonClassName}
			>
				Grant Permissions
			</AriakitButton>
			{grantPermissions.data && <div>Permissions granted.</div>}
			{grantPermissions.error && (
				<div>
					Error:{" "}
					{grantPermissions.error.shortMessage ||
						grantPermissions.error.message}
				</div>
			)}
		</div>
	);
}

function Mint() {
	const { address } = useAccount();

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

	const { formatted: balance } = useExpBalance();
	const [transactions, setTransactions] = useState<Set<string>>(new Set());

	useEffect(() => {
		if (callsStatusData?.status !== "success") return;
		const receipts = (
			callsStatusData as {
				receipts?: { transactionHash?: string }[];
			} | undefined
		)?.receipts ?? [];
		const hashes = receipts
			.map((r) => r.transactionHash)
			.filter((h): h is string => Boolean(h));
		if (hashes.length) {
			setTransactions((prev) => new Set([...prev, ...hashes]));
		}
	}, [callsStatusData]);

	useEffect(() => {
		if (id) {
			console.info("[Mint] useSendCalls response", id);
		}
	}, [id]);

	useEffect(() => {
		if (error) {
			console.error("[Mint] Error", error);
		}
	}, [error]);

	if (!address) return null;

	return (
		<div>
			<h3>Mint EXP [balance: {balance}]</h3>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					sendCalls({
						calls: [
							{
								...exp1Config,
								args: [address, parseEther("100")],
								functionName: "mint",
								to: exp1Address,
							},
						],
					});
				}}
			>
				<AriakitButton
					type="submit"
					disabled={isPending}
					className={buttonClassName}
					style={{ marginBottom: "5px" }}
				>
					{isPending ? "Confirming..." : "Mint 100 EXP"}
				</AriakitButton>
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

function CreateEscrow() {
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
				<AriakitButton
					type="submit"
					disabled={isPending}
					className={buttonClassName}
					style={{ marginBottom: "5px" }}
				>
					{isPending ? "Confirming..." : "Create Escrow"}
				</AriakitButton>
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
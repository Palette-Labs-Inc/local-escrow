import { useBalance } from "./hooks.ts";
import { Hooks } from "porto/wagmi";
import { exp1Address, exp1Config } from "./contracts/contracts.ts";
import { useAccount, useConnectors } from "wagmi";
import { truncateHexString } from "./utilities.ts";
import { type Errors, Json } from "ox";
import { permissions } from "./constants.ts";
import { useEffect, useState } from "react";
import { useCallsStatus, useSendCalls } from "wagmi";
import { encodeFunctionData, parseEther } from "viem";
import EscrowFactory from "./contracts/EscrowFactory.ts";

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
	return (
		<main>
			<hr />
			<Connect />
			<hr />
			<GrantMintPermissions />
			<hr />
			<GrantCreateEscrowPermissions />
			<hr />
			<Mint />
			<hr />
			<CreateEscrow />
		</main>
	);
}

function Connect() {
	const label = `_exp-0003-${Math.floor(Date.now() / 1_000)}`;
	const [grantPermissions, setGrantPermissions] = useState<boolean>(true);

	const connectors = useConnectors();
	const connector = connectors.find((x) => x.id === "xyz.ithaca.porto");

	const { address } = useAccount();
	const connect = Hooks.useConnect();
	const disconnect = Hooks.useDisconnect();
	const allPermissions_ = Hooks.usePermissions();
	const latestPermissions = allPermissions_.data?.at(-1);

	const disconnectFromAll = async () => {
		await Promise.all(connectors.map((c) => c.disconnect().catch(() => {})));
		await disconnect.mutateAsync({ connector });
	};

	return (
		<div>
			<div
				style={{
					gap: "10px",
					display: "flex",
					marginBottom: "0px",
					alignItems: "flex-end",
				}}
			>
				<h3 style={{ marginBottom: "0px" }}>[client] wallet_connect</h3>|
				<p style={{ marginBottom: "0px" }}>{connect.status}</p>
			</div>
			<p>
				<input
					type="checkbox"
					checked={grantPermissions}
					onChange={() => setGrantPermissions((x) => !x)}
				/>
				Grant Permissions
			</p>

			{connector && (
				<div key={connector?.uid} style={{ display: "flex", gap: "10px" }}>
					<button
						key={connector?.uid}
						disabled={connect.status === "pending"}
						onClick={async () =>
							disconnectFromAll().then(() =>
								connect.mutateAsync({
									connector,
									grantPermissions: grantPermissions
										? permissions()
										: undefined,
								}),
							)
						}
						type="button"
					>
						Login
					</button>
					<button
						disabled={connect.status === "pending"}
						onClick={async () =>
							disconnectFromAll().then(() => {
								connect.mutate({
									connector,
									createAccount: { label },
									grantPermissions: grantPermissions
										? permissions()
										: undefined,
								});
							})
						}
						type="button"
					>
						Register
					</button>
					<button
						type="button"
						onClick={disconnectFromAll}
						disabled={
							connect.status === "pending" ||
							disconnect.status === "pending" ||
							!address
						}
					>
						Disconnect
					</button>
				</div>
			)}
			<p>{connect.error?.message}</p>
			{address && <p>Account: {address}</p>}

			{address && latestPermissions && (
				<details
					style={{ marginTop: "5px" }}
					key={latestPermissions.expiry + latestPermissions.id}
				>
					<summary>
						<span style={{ marginRight: "8px" }}>Permissions:</span>
						{truncateHexString({
							address: latestPermissions?.key.publicKey,
							length: 12,
						})}
					</summary>
					<pre>{Json.stringify(latestPermissions, undefined, 2)}</pre>
				</details>
			)}
		</div>
	);
}

function GrantMintPermissions() {
	const grantPermissions = Hooks.useGrantPermissions();

	return (
		<div>
			<h2>Grant Permissions to Mint EXP</h2>
			<button onClick={() => grantPermissions.mutate(key())} type="button">
				Grant Permissions
			</button>
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

function GrantCreateEscrowPermissions() {
	const grantPermissions = Hooks.useGrantPermissions();

	return (
		<div>
			<h2>Grant Permissions to Create Escrow</h2>
			<button onClick={() => grantPermissions.mutate(key2())} type="button">
				Grant Permissions
			</button>
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
			refetchInterval: ({ state }: { state: { data: { status: string } } }) => {
				if (state.data?.status === "success") return false;
				return 1_000;
			},
		},
	});

	const balance = useBalance();
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
				<button
					type="submit"
					disabled={isPending}
					style={{ marginBottom: "5px" }}
				>
					{isPending ? "Confirming..." : "Mint 100 EXP"}
				</button>
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

	const { data: id, error, isPending, sendCalls } = useSendCalls();
	const {
		data: callsStatusData,
		isLoading: isConfirming,
		isSuccess: isConfirmed,
	} = useCallsStatus({
		id: id?.id as string,
		query: {
			enabled: !!id,
			refetchInterval: ({ state }: { state: { data: { status: string } } }) => {
				if (state.data?.status === "success") return false;
				return 1_000;
			},
		},
	});

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
				<button
					type="submit"
					disabled={isPending}
					style={{ marginBottom: "5px" }}
				>
					{isPending ? "Confirming..." : "Create Escrow"}
				</button>
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
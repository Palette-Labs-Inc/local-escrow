import { useBalance } from "./hooks.ts";
import { Hooks } from "porto/wagmi";
import { exp1Address, exp1Config } from "./contracts/contracts.ts";
import { useAccount, useConnectors } from "wagmi";
import { truncateHexString } from "./utilities.ts";
import { type Errors, Json } from "ox";
import { permissions } from "./constants.ts";
import {
	useEffect,
	useState,
	useMemo,
} from "react";
import {
	useCallsStatus,
	useSendCalls,
	useWatchContractEvent,
	useReadContracts,
} from "wagmi";
import {
	encodeFunctionData,
	parseEther,
	type Log,
	decodeEventLog,
} from "viem";
import EscrowFactory from "./contracts/EscrowFactory.ts";
import SimpleEscrow from "./contracts/SimpleEscrow.ts";
import { useEscrowStore, type EscrowEventInfo } from "./store/escrow-store.ts";
import { EscrowList } from "./components/escrow/escrow-list.tsx";

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

/**
 * Hook to watch for EscrowCreated events and store them in the Zustand store
 */
function useWatchEscrowEvents() {
  const { address: currentUser } = useAccount();
  const { addEvent } = useEscrowStore();
  
  useWatchContractEvent({
    address: EscrowFactory.address as `0x${string}`,
    abi: EscrowFactory.abi,
    eventName: "EscrowCreated",
    args: currentUser ? { payee: currentUser } : undefined,
    onLogs: (logs: readonly Log[]) => {
      if (!currentUser) return;
      
      // eslint-disable-next-line no-console
      console.debug("[useWatchEscrowEvents] listener received", logs);

      for (const log of logs) {
        const {
          escrowAddress,
          payee,
          storefront,
          arbiter,
        } = (log as unknown as { args: unknown }).args as {
          escrowAddress: `0x${string}`;
          payee: `0x${string}`;
          storefront: `0x${string}`;
          arbiter: `0x${string}`;
        };

        console.info("EscrowCreated event", {
          escrowAddress,
          payee,
          storefront,
          arbiter,
          txHash: log.transactionHash,
        });

        addEvent(currentUser, {
          escrowAddress,
          payee,
          storefront,
          arbiter,
          blockNumber: log.blockNumber ?? undefined,
          transactionHash: log.transactionHash as `0x${string}` | undefined,
        });
      }
    },
  });
}

function EscrowEventsList() {
	const { address } = useAccount();
	const { eventsByAccount } = useEscrowStore();
	
	const events = address ? (eventsByAccount[address] || []) : [];
	
	useWatchEscrowEvents();

	if (events.length === 0) {
		return <h3>No new escrows created</h3>;
	}

	return (
		<div>
			<h3>Escrow Created Events</h3>
			<ul style={{ listStyleType: "none", padding: 0 }}>
				{events.map((e) => (
					<EscrowItem key={e.escrowAddress} event={e} />
				))}
			</ul>
		</div>
	);
}

interface EscrowInfo {
	payer: `0x${string}`;
	settled: boolean;
	disputed: boolean;
	settleTime: bigint;
}

function EscrowItem({ event }: { event: EscrowEventInfo }) {
	const { address } = useAccount();
	const { addEvent } = useEscrowStore();
  
	const {
		escrowAddress,
		transactionHash,
		blockNumber,
		payee,
		arbiter,
		storefront,
	} = event;

	const contracts = [
		{
			address: escrowAddress,
      abi: SimpleEscrow.abi,
			functionName: "payer",
		},
		{
			address: escrowAddress,
      abi: SimpleEscrow.abi,
			functionName: "isSettled",
		},
		{
			  address: escrowAddress,
      abi: SimpleEscrow.abi,
			functionName: "isDisputed",
		},
		{
			address: escrowAddress,
      abi: SimpleEscrow.abi,
			functionName: "settleTime",
		},
	] as const;

	// Read core state from the cloned escrow contract (typed)
	const result = useReadContracts<typeof contracts>({
		allowFailure: true,
		contracts,
	});

  const { data, isLoading, isError } = result;

	const escrowInfo = useMemo<EscrowInfo | undefined>(() => {
		if (!data || isLoading || isError) return undefined;

		const [payerRes, settledRes, disputedRes, settleTimeRes] = data.map(
			(d) => (d as { result: unknown }).result,
		) as [`0x${string}`, boolean, boolean, bigint];

		return {
			payer: payerRes,
			settled: settledRes,
			disputed: disputedRes,
			settleTime: settleTimeRes,
		} satisfies EscrowInfo;
	}, [data, isLoading, isError]);

	// Log contract read results once fetched
	useEffect(() => {
		if (data && !isLoading && !isError) {
			// eslint-disable-next-line no-console
			console.info("Escrow clone data", escrowAddress, {
				escrowInfo,
			});
		}
		// We intentionally depend on the loading/error flags and data array.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isLoading, isError, escrowAddress, escrowInfo]);

	// Ensure event present in global store (in case watcher missed it).
	useEffect(() => {
		if (address) {
			addEvent(address, event);
		}
	}, [event, addEvent, address]);

	return (
		<li
			style={{ marginBottom: "1rem" }}
			key={transactionHash ?? `${escrowAddress}-${blockNumber?.toString()}`}
		>
			<p style={{ margin: 0 }}>
				Escrow {truncateHexString({ address: escrowAddress, length: 12 })} created
				(tx:{" "}
				<a
					href={`https://sepolia.basescan.org/tx/${transactionHash}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{transactionHash?.slice(0, 10)}...
				</a>
				)
			</p>

			{isLoading && <small>Loading contract details…</small>}
			{isError && <small>Failed to load contract details.</small>}

			{escrowInfo && (
				<ul style={{ listStyleType: "square", paddingLeft: "1.2rem", margin: 0 }}>
					<li>Payee: {payee}</li>
					<li>Payer: {escrowInfo.payer}</li>
					<li>Arbiter: {arbiter}</li>
					<li>Storefront: {storefront}</li>
					<li>Settled: {String(escrowInfo.settled)}</li>
					<li>Disputed: {String(escrowInfo.disputed)}</li>
					<li>Settle Deadline: {Number(escrowInfo.settleTime)}</li>
				</ul>
			)}
		</li>
	);
}

export function App() {
	return (
		<main>
			<hr />
			<Connect />
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

function Connect() {
	const label = `local-protocol-${Math.floor(Date.now() / 1_000)}`;
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
						onClick={async () => {
							// eslint-disable-next-line no-console
							console.info("[Connect] Login clicked");
							disconnectFromAll().then(() =>
								connect.mutateAsync({
									connector,
									grantPermissions: grantPermissions
										? permissions()
										: undefined,
								}),
							);
						}}
						type="button"
					>
						Login
					</button>
					<button
						disabled={connect.status === "pending"}
						onClick={async () => {
							// eslint-disable-next-line no-console
							console.info("[Connect] Register clicked");
							disconnectFromAll().then(() => {
								connect.mutate({
									connector,
									createAccount: { label },
									grantPermissions: grantPermissions
										? permissions()
										: undefined,
								});
							});
						}}
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
			refetchInterval: (query) => {
				if (query.state.data?.status === "success") return false;
				return 1_000;
			},
		},
	});

	const { formatted: balance } = useBalance();
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
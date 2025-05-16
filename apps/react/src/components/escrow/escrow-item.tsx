import { useMemo, useState, useEffect } from "react";
import {
  useAccount,
  useReadContracts,
  useSendCalls,
  useCallsStatus,
  useReadContract,
  type UseReadContractsReturnType,
} from "wagmi";
import { truncateHexString } from "../../utilities.ts";
import SimpleEscrow from "../../contracts/SimpleEscrow.ts";
import { parseEther } from "viem";
import type { EscrowEventInfo } from "../../store/escrow-store.ts";
import { exp1Address } from "../../contracts/contracts.ts";
import { exp1Abi } from "../../contracts/contracts.ts";
import { Value } from "ox";

interface EscrowInfo {
  payer: `0x${string}`;
  settled: boolean;
  disputed: boolean;
  settleTime: bigint;
}

// -----------------------------------------------------------------------------
// Helper – clickable, styled badge that shows a truncated address and links to
// the Base Sepolia explorer.
// -----------------------------------------------------------------------------

interface AddressBadgeProps {
  address: `0x${string}`;
  /**
   * Number of hex characters (without 0x) to show at the start/end of the
   * truncated string. Defaults to 6 which renders e.g. `0x123456…cdefab`.
   */
  length?: number;
}

function AddressBadge({ address, length = 6 }: AddressBadgeProps) {
  const truncated = truncateHexString({ address, length });

  const style: React.CSSProperties = {
    display: "inline-block",
    padding: "0.15rem 0.45rem",
    borderRadius: 6,
    backgroundColor: "#e6f0ff",
    color: "#1a5cff",
    fontWeight: 500,
    fontSize: "0.9em",
    textDecoration: "none",
  };

  return (
    <a
      href={`https://sepolia.basescan.org/address/${address}`}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
    >
      {truncated}
    </a>
  );
}

export function EscrowItem({ event }: { event: EscrowEventInfo }) {
  const { address: currentUser } = useAccount();
  const {
    escrowAddress,
    transactionHash,
    payee,
    arbiter,
    storefront,
  } = event;

  const contracts = [
    { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "payer" },
    { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "isSettled" },
    { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "isDisputed" },
    { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "settleTime" },
  ] as const;

  const result: UseReadContractsReturnType<typeof contracts> = useReadContracts({
    allowFailure: true,
    contracts,
  });

  const { data, isLoading, isError } = result;

  const escrowInfo: EscrowInfo | undefined = useMemo(() => {
    if (!data || isLoading || isError) return undefined;
    // Wagmi returns a discriminated union where 'result' exists on success.
    // We cast for convenience – UI gracefully handles undefined values.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const [payerRes, settledRes, disputedRes, settleTimeRes] = data.map((d) => (d as { result: unknown }).result) as [`0x${string}`, boolean, boolean, bigint];
    return { payer: payerRes, settled: settledRes, disputed: disputedRes, settleTime: settleTimeRes };
  }, [data, isLoading, isError]);

  /** ----------------------------------------------------------------------------------
   * Actions – each call goes through porto delegated signer via useSendCalls.
   * We allow the user to (1) dispute, (2) remove dispute, (3) settle with token + amount.
   * ----------------------------------------------------------------------------------*/
  const [amount, setAmount] = useState<string>("");

  // Fetch current EXP balance (raw bigint) for connected account
  const { data: balanceRaw } = useReadContract({
    abi: exp1Abi,
    address: exp1Address,
    functionName: "balanceOf",
    args: [
      (currentUser ?? `0x${"0".repeat(40)}`) as `0x${string}`,
    ],
    query: { enabled: !!currentUser, refetchInterval: 4_000 },
  });

  const amountWei = amount ? parseEther(amount) : 0n;
  const isAmountInvalid = !amount || amountWei === 0n || (balanceRaw ?? 0n) < amountWei;

  const {
    data: txId,
    error,
    isPending,
    sendCalls,
  } = useSendCalls();

  // Link txId -> confirmation status
  const { data: statusData } = useCallsStatus({ id: txId?.id as string, query: { enabled: !!txId } });

  // Set a sensible default once balance is fetched
  useEffect(() => {
    if (amount) return; // respect user input
    if (balanceRaw === undefined) return;

    const tenWei = parseEther("10");
    if (balanceRaw >= tenWei) {
      setAmount("10");
    } else {
      setAmount(Value.formatEther(balanceRaw));
    }
  }, [balanceRaw, amount]);

  const buttonStyle: React.CSSProperties = { marginRight: "0.5rem" };

  return (
    <article
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "1rem",
      }}
    >
      <header style={{ marginBottom: "0.5rem" }}>
        <strong>Escrow </strong>
        <AddressBadge address={escrowAddress} length={10} />
      </header>

      {isLoading && <small>Fetching escrow state…</small>}
      {isError && <small>Failed to fetch escrow state</small>}

      {escrowInfo && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            Payee: <AddressBadge address={payee} />
          </li>
          <li>
            Payer: <AddressBadge address={escrowInfo.payer} />
          </li>
          <li>
            Arbiter: <AddressBadge address={arbiter} />
          </li>
          <li>
            Storefront: <AddressBadge address={storefront} />
          </li>
          <li>Settled: {String(escrowInfo.settled)}</li>
          <li>Disputed: {String(escrowInfo.disputed)}</li>
          <li>Deadline: {Number(escrowInfo.settleTime)}</li>
        </ul>
      )}

      {/* Action panel – hidden when wallet not connected */}
      {currentUser && (
        <section style={{ marginTop: "1rem" }}>
          <h4 style={{ margin: "0 0 0.5rem 0" }}>Actions</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button
              style={buttonStyle}
              disabled={isPending}
              onClick={() =>
                sendCalls({
                  calls: [
                    { to: escrowAddress, abi: SimpleEscrow.abi, functionName: "dispute" },
                  ],
                })
              }
              type="button"
            >
              Dispute
            </button>

            <button
              style={buttonStyle}
              disabled={isPending}
              onClick={() =>
                sendCalls({
                  calls: [
                    { to: escrowAddress, abi: SimpleEscrow.abi, functionName: "removeDispute" },
                  ],
                })
              }
              type="button"
            >
              Remove Dispute
            </button>

            {/* Simple settle form */}
          </div>

          <div style={{
            marginTop: "0.75rem",
            display: "grid",
            gap: "0.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          }}>
            <label style={{ fontSize: "0.85rem" }}>
              Amount in EXP
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.4rem 0.6rem",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  marginTop: 4,
                }}
              />
            </label>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                style={buttonStyle}
                disabled={isPending || isAmountInvalid}
                onClick={() => {
                  /*
                   * Two-step flow:
                   * 1) transfer EXP from the connected wallet into the escrow contract so that
                   *    SimpleEscrow holds the funds.
                   * 2) invoke `settle` on the escrow which will forward the just-deposited
                   *    tokens to the payee.
                   *
                   * Both calls are bundled in a single request via `sendCalls`.
                   */
                  sendCalls({
                    calls: [
                      {
                        // Step 1 – move tokens into escrow
                        to: exp1Address,
                        abi: exp1Abi,
                        functionName: "transfer",
                        args: [escrowAddress, amountWei],
                      },
                      {
                        // Step 2 – settle escrow (will transfer tokens from escrow → payee)
                        to: escrowAddress,
                        abi: SimpleEscrow.abi,
                        functionName: "settle",
                        args: [exp1Address, amountWei],
                      },
                    ],
                  });
                }}
                type="button"
              >
                Settle
              </button>
            </div>
          </div>

          {isAmountInvalid && (
            <small style={{ color: "red" }}>
              Enter a valid amount ≤ balance
            </small>
          )}

          {error && <div style={{ color: "red" }}>{error.message}</div>}
          {statusData?.status && <small>Tx status: {statusData.status}</small>}
        </section>
      )}

      {/* TX link (if we got it) */}
      {transactionHash && (
        <footer style={{ marginTop: "0.5rem" }}>
          <a
            href={`https://sepolia.basescan.org/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View creation TX
          </a>
        </footer>
      )}
    </article>
  );
} 
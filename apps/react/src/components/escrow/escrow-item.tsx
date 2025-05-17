import { useMemo, useEffect } from "react";
import {
  useAccount,
  useReadContracts,
  useSendCalls,
  useCallsStatus,
  useReadContract,
  type UseReadContractsReturnType,
} from "wagmi";
import { truncateHexString } from "../../utils.ts";
import SimpleEscrow from "../../contracts/SimpleEscrow.ts";
import { parseEther, zeroAddress } from "viem";
import type { EscrowEventInfo } from "../../store/escrow-store.ts";
import { exp1Address } from "../../contracts/contracts.ts";
import { exp1Abi } from "../../contracts/contracts.ts";
import { Value } from "ox";
import {
  useFormStore,
  Button as AriakitButton,
  Form as AriakitForm,
  FormInput as AriakitFormInput,
  FormSubmit as AriakitFormSubmit,
} from "@ariakit/react";

export function EscrowItem({ event }: EscrowItem.Props) {
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

  const escrowInfo: EscrowItem.EscrowInfo | undefined = useMemo(() => {
    if (!data || isLoading || isError) return undefined;
    const [payerRes, settledRes, disputedRes, settleTimeRes] = data.map((d) => (d as { result: unknown }).result) as [`0x${string}`, boolean, boolean, bigint];
    return { payer: payerRes, settled: settledRes, disputed: disputedRes, settleTime: settleTimeRes };
  }, [data, isLoading, isError]);

  const escrowStatus: EscrowItem.EscrowStatus | undefined = useMemo(() => {
    if (!escrowInfo) return undefined;
    if (escrowInfo.settled) return "settled";
    if (escrowInfo.disputed) return "disputed";
    return "pending";
  }, [escrowInfo]);

  const form = useFormStore({ defaultValues: { amount: "" } });

  const amount = (form.useValue as unknown as (name: string) => string)("amount") ?? "";

  const { data: balanceRaw } = useReadContract({
    abi: exp1Abi,
    address: exp1Address,
    functionName: "balanceOf",
    args: [
      (currentUser ?? zeroAddress),
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

  const { data: statusData } = useCallsStatus({
    id: txId?.id as string,
    query: {
      enabled: !!txId,
      refetchInterval: (query) => {
        if (query.state.data?.status === "success") return false;
        return 1_000;
      },
    },
  });

  useEffect(() => {
    if (amount) return;
    if (balanceRaw === undefined) return;

    const tenWei = parseEther("10");
    const defaultAmt = balanceRaw >= tenWei ? "10" : Value.formatEther(balanceRaw);
    form.setValue("amount", defaultAmt);
  }, [balanceRaw, amount, form]);


  useEffect(() => {
    if (statusData?.status !== "success") return;
    result.refetch();
  }, [statusData, result]);

  return (
    <article className="border border-gray-200 rounded-lg p-4">
      <header className="mb-2 flex justify-between items-center gap-2">
        <div>
          <strong>Escrow </strong>
          <EscrowItem.AddressBadge address={escrowAddress} length={10} />
        </div>
        {escrowStatus && <EscrowItem.StatusBadge status={escrowStatus} />}
      </header>

      {isLoading && <small>Fetching escrow state…</small>}
      {isError && <small>Failed to fetch escrow state</small>}

      {escrowInfo && (
        <ul className="list-none p-0 space-y-1 text-sm">
          <li>
            Payee: <EscrowItem.AddressBadge address={payee} />
          </li>
          <li>
            Payer: <EscrowItem.AddressBadge address={escrowInfo.payer} />
          </li>
          <li>
            Arbiter: <EscrowItem.AddressBadge address={arbiter} />
          </li>
          <li>
            Storefront: <EscrowItem.AddressBadge address={storefront} />
          </li>
          <li>Deadline: {Number(escrowInfo.settleTime)}</li>
        </ul>
      )}

      {currentUser && (
        <section className="mt-4">
          <h4 className="mb-2">Actions</h4>
          <div className="flex flex-wrap gap-2">
            <AriakitButton
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-0.5 text-xs font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50"
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
            </AriakitButton>

            <AriakitButton
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-0.5 text-xs font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50"
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
            </AriakitButton>

            <AriakitForm
              store={form}
              aria-label="Settle escrow"
              className="mt-3 grid gap-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
              onSubmit={() => {
                if (isPending || isAmountInvalid) return;
                sendCalls({
                  calls: [
                    {
                      to: exp1Address,
                      abi: exp1Abi,
                      functionName: "transfer",
                      args: [escrowAddress, amountWei],
                    },
                    {
                      to: escrowAddress,
                      abi: SimpleEscrow.abi,
                      functionName: "settle",
                      args: [exp1Address, amountWei],
                    },
                  ],
                });
              }}
            >
              <label className="text-sm" htmlFor={String(form.names.amount)}>
                Amount in EXP
                <AriakitFormInput
                  name={form.names.amount}
                  id={String(form.names.amount)}
                  placeholder="0.0"
                  type="number"
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  required
                />
              </label>

              <div className="flex items-end">
                <AriakitFormSubmit
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-2 py-0.5 text-xs font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50"
                  disabled={isPending || isAmountInvalid}
                >
                  Settle
                </AriakitFormSubmit>
              </div>
            </AriakitForm>
          </div>

          {isAmountInvalid && (
            <small className="text-red-600">
              Enter a valid amount ≤ balance
            </small>
          )}

          {error && <div className="text-red-600">{error.message}</div>}
          {statusData?.status && <small>Tx status: {statusData.status}</small>}
        </section>
      )}

      {transactionHash && (
        <footer className="mt-2 text-sm">
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

export namespace EscrowItem {
  export interface Props {
    event: EscrowEventInfo;
  }

  export interface EscrowInfo {
    payer: `0x${string}`;
    settled: boolean;
    disputed: boolean;
    settleTime: bigint;
  }

  interface AddressBadgeProps {
    address: `0x${string}`;
    length?: number;
  }

  export function AddressBadge({ address, length = 6 }: AddressBadgeProps) {
    const truncated = truncateHexString({ address, length });
    return (
      <a
        href={`https://sepolia.basescan.org/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium text-sm"
      >
        {truncated}
      </a>
    );
  }

  export type EscrowStatus = "settled" | "disputed" | "pending";

  interface StatusBadgeProps {
    status: EscrowStatus;
  }

  export function StatusBadge({ status }: StatusBadgeProps) {
    const map: Record<EscrowStatus, { label: string; className: string }> = {
      settled: { label: "Settled", className: "bg-green-50 text-green-700" },
      disputed: { label: "Disputed", className: "bg-red-50 text-red-700" },
      pending: { label: "Pending", className: "bg-blue-50 text-blue-700" },
    };
    const { label, className } = map[status];
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${className}`}>
        {label}
      </span>
    );
  }
} 
import {
  useAccount,
} from "wagmi";
import {
  Button as AriakitButton,
  Form as AriakitForm,
  FormInput as AriakitFormInput,
  FormSubmit as AriakitFormSubmit,
} from "@ariakit/react";
import type { Address } from "ox";

import { truncateHexString } from "../utils.ts";
import type { EscrowEventInfo } from "../store/escrow-store.ts";
import * as EscrowInfo from "../lib/EscrowInfo.ts";
import * as EscrowActions from "../lib/EscrowActions.ts";

const buttonClassName = "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50";

export function EscrowItem({ event }: EscrowItem.Props) {
  const { address: currentUser } = useAccount();
  const { escrowAddress, transactionHash, payee, arbiter, storefront } = event;
  const escrowQuery = EscrowInfo.useEscrowInfo({ escrowAddress });

  if (escrowQuery.isError) {
    return <small>Failed to fetch escrow state</small>
  }

  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <EscrowItem.Header 
        address={escrowAddress} 
        status={escrowQuery.status} 
      />

      {escrowQuery.isLoading && <small>Fetching escrow state…</small>}

      {escrowQuery.info && (
        <EscrowItem.Details
          info={escrowQuery.info}
          payee={payee}
          arbiter={arbiter}
          storefront={storefront}
        />
      )}

      {currentUser && (
        <EscrowItem.Actions
          escrowAddress={escrowAddress}
          onSuccess={escrowQuery.refetch}
        />
      )}

      {transactionHash && (
        <EscrowItem.Footer transactionHash={transactionHash} />
      )}
    </article>
  );
}

export namespace EscrowItem {
  export interface Props {
    event: EscrowEventInfo;
  }

  export function Header({ address, status }: { address: Address.Address; status?: EscrowInfo.EscrowStatus }) {
    return (
      <header className="mb-2 flex items-center justify-between gap-2">
        <div>
          <strong>Escrow </strong>
          <AddressBadge address={address} length={10} />
        </div>
        {status && <StatusBadge status={status} />}
      </header>
    );
  }

  export function Details({ info, payee, arbiter, storefront }: { 
    info: EscrowInfo.EscrowInfo; 
    payee: Address.Address; 
    arbiter: Address.Address; 
    storefront: Address.Address; 
  }) {
    return (
      <ul className="space-y-1 list-none p-0 text-sm">
        <li>
          Payee: <AddressBadge address={payee} />
        </li>
        <li>
          Payer: <AddressBadge address={info.payer} />
        </li>
        <li>
          Arbiter: <AddressBadge address={arbiter} />
        </li>
        <li>
          Storefront: <AddressBadge address={storefront} />
        </li>
        <li>Deadline: {Number(info.settleTime)}</li>
      </ul>
    );
  }

  export function Actions({ escrowAddress, onSuccess }: { 
    escrowAddress: Address.Address; 
    onSuccess: () => void;
  }) {
    return (
      <section className="mt-4">
        <h4 className="mb-2">Actions</h4>
        <div className="flex flex-wrap gap-2">
          <DisputeButton escrowAddress={escrowAddress} onSuccess={onSuccess} />
          <RemoveDisputeButton escrowAddress={escrowAddress} onSuccess={onSuccess} />
          <SettleForm 
            escrowAddress={escrowAddress} 
            onSuccess={onSuccess}
          />
        </div>
      </section>
    );
  }

  export function DisputeButton({ escrowAddress, onSuccess }: { 
    escrowAddress: Address.Address; 
    onSuccess: () => void;
  }) {
    const { isPending, handleDispute } = EscrowActions.useDisputeAction({
      escrowAddress,
      onSuccess,
    });

    return (
      <AriakitButton
        className={buttonClassName}
        disabled={isPending}
        onClick={handleDispute}
        type="button"
      >
        Dispute
      </AriakitButton>
    );
  }

  export function RemoveDisputeButton({ escrowAddress, onSuccess }: { 
    escrowAddress: Address.Address; 
    onSuccess: () => void;
  }) {
    const { isPending, handleRemoveDispute } = EscrowActions.useRemoveDisputeAction({
      escrowAddress,
      onSuccess,
    });

    return (
      <AriakitButton
        className={buttonClassName}
        disabled={isPending}
        onClick={handleRemoveDispute}
        type="button"
      >
        Remove Dispute
      </AriakitButton>
    );
  }

  export function SettleForm({ escrowAddress, onSuccess }: { 
    escrowAddress: Address.Address; 
    onSuccess: () => void;
  }) {
    const {
      form,
      amountWei,
      isAmountInvalid,
    } = EscrowActions.useSettleForm();

    const {
      error,
      isPending,
      statusData,
      handleSettle,
    } = EscrowActions.useSettleAction({
      escrowAddress,
      amountWei,
      isAmountInvalid,
      onSuccess,
    });

    return (
      <AriakitForm
        store={form}
        aria-label="Settle escrow"
        className="mt-3 grid gap-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
        onSubmit={handleSettle}
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
            className={buttonClassName}
            disabled={isPending || isAmountInvalid}
          >
            Settle
          </AriakitFormSubmit>
        </div>

        {isAmountInvalid && <small className="text-red-600">Enter a valid amount ≤ balance</small>}
        {error && <div className="text-red-600">{error.message}</div>}
        {statusData?.status && <small>Tx status: {statusData.status}</small>}
      </AriakitForm>
    );
  }

  export function Footer({ transactionHash }: { transactionHash: string }) {
    return (
      <footer className="mt-2 text-sm">
        <a
          href={`https://sepolia.basescan.org/tx/${transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View creation TX
        </a>
      </footer>
    );
  }

  interface AddressBadgeProps {
    address: Address.Address;
    length?: number;
  }

  export function AddressBadge({ address, length = 6 }: AddressBadgeProps) {
    const truncated = truncateHexString({ address, length });
    return (
      <a
        href={`https://sepolia.basescan.org/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded bg-blue-50 px-2 py-0.5 text-sm font-medium text-blue-700"
      >
        {truncated}
      </a>
    );
  }

  interface StatusBadgeProps {
    status: EscrowInfo.EscrowStatus;
  }

  export function StatusBadge({ status }: StatusBadgeProps) {
    const map: Record<EscrowInfo.EscrowStatus, { label: string; className: string }> = {
      settled: { label: "Settled", className: "bg-green-50 text-green-700" },
      disputed: { label: "Disputed", className: "bg-red-50 text-red-700" },
      pending: { label: "Pending", className: "bg-blue-50 text-blue-700" },
    };
    const { label, className } = map[status];
    return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{label}</span>;
  }
} 
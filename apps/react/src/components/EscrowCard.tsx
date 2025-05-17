import { Button as AriakitButton } from '@ariakit/react'
import { useAccount } from 'wagmi'
import type { EscrowEventInfo } from '../store/escrow-store.ts'
import * as Dispute from '../lib/Dispute.ts'
import * as RemoveDispute from '../lib/RemoveDispute.ts'
import { AddressBadge } from './AddressBadge.tsx'
import { StatusBadge } from './StatusBadge.tsx'
import { SettleEscrowForm } from './SettleEscrowForm.tsx'
import { RefundForm } from './RefundForm.tsx'
import { ResolveDisputeForm } from './ResolveDisputeForm.tsx'
import * as EscrowInfo from '../lib/EscrowInfo.ts'

const buttonClassName =
  'inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm disabled:opacity-50'

const buttonVariantClasses = {
  primary: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  secondary: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-50 text-red-700 hover:bg-red-100',
}

export interface EscrowCardProps {
  event: EscrowEventInfo
}

export function EscrowCard({ event }: EscrowCardProps) {
  const { address: currentUser } = useAccount()
  const { escrowAddress, transactionHash, payee, arbiter, storefront } = event

  const {
    info,
    status,
    userRole,
    isLoading,
    isError,
    refetch,
    canDispute,
    canRemoveDispute,
    canSettle,
    canRefund,
    canResolveDispute
  } = EscrowInfo.useEscrow({
    escrowAddress,
    currentUser,
    payee,
    arbiter,
  })

  // Actions ---------------------------------------------------------------
  const disputeAction = Dispute.useAction({
    escrowAddress,
    onSuccess: refetch,
  })

  const removeDisputeAction = RemoveDispute.useAction({
    escrowAddress,
    onSuccess: refetch,
  })

  if (isError) return <small>Failed to fetch escrow state</small>

  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <header className="mb-2 flex items-center justify-between gap-2">
        <div>
          <strong>Escrow </strong>
          <AddressBadge address={escrowAddress} length={10} />
        </div>
        {status && <StatusBadge status={status} />}
      </header>

      {isLoading && <small>Fetching escrow state…</small>}

      {info && (
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
          <li>Role: {userRole}</li>
        </ul>
      )}

      {currentUser && (
        <section className="mt-4">
          <div className="flex flex-wrap gap-2">
            {canDispute && (
              <AriakitButton
                className={`${buttonClassName} ${buttonVariantClasses.danger}`}
                disabled={disputeAction.isPending}
                onClick={disputeAction.handle}
                type="button"
              >
                Dispute
              </AriakitButton>
            )}

            {canRemoveDispute && (
              <AriakitButton
                className={`${buttonClassName} ${buttonVariantClasses.secondary}`}
                disabled={removeDisputeAction.isPending}
                onClick={removeDisputeAction.handle}
                type="button"
              >
                Remove Dispute
              </AriakitButton>
            )}
          </div>

          {canSettle && (
            <SettleEscrowForm escrowAddress={escrowAddress} onSuccess={refetch} />
          )}

          {canRefund && (
            <RefundForm escrowAddress={escrowAddress} onSuccess={refetch} />
          )}

          {canResolveDispute && (
            <ResolveDisputeForm escrowAddress={escrowAddress} onSuccess={refetch} />
          )}
        </section>
      )}

      {transactionHash && (
        <footer className="mt-2 text-sm">
          <a
            href={`https://sepolia.basescan.org/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View order
          </a>
        </footer>
      )}
    </article>
  )
} 
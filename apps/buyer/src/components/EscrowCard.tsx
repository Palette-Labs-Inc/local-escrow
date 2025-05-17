import { useAccount } from 'wagmi'
import { AddressBadge, StatusBadge, Payer } from '@local-escrow/react'
import * as EscrowInfo from '@local-escrow/react'
import type { EscrowEventInfo } from '#/store/escrow-store'

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

  const onSuccess = refetch

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
          {userRole === 'payer' && (
            <Payer.Widgets
              escrowAddress={escrowAddress}
              onSuccess={onSuccess}
              permissions={{ canDispute, canRemoveDispute, canSettle, canRefund, canResolveDispute }}
            />
          )}
        </section>
      )}

      {transactionHash && (
        <div>
        <strong>Transaction </strong>
        <AddressBadge address={transactionHash} length={10} />
      </div>
      )}
    </article>
  )
} 
import { useAccount } from 'wagmi'
import {
  AddressBadge,
  StatusBadge,
  Payer,
  useEscrowData,
  useEscrowState,
  useEscrowPermissions,
} from '@local-escrow/react'
import { getUserRole, type UserRole } from '@local-escrow/core'
import type { Address, Hex } from 'ox'

export interface EscrowCardProps {
  escrowAddress: Address.Address
  transactionHash?: Hex.Hex
}

export function EscrowCard({ escrowAddress, transactionHash }: EscrowCardProps) {
  const { address: currentUser } = useAccount()

  const data = useEscrowData({ escrowAddress })
  const status = useEscrowState(data.info)

  const role: UserRole = data.info
    ? getUserRole({
        currentUser,
        payer: data.info.payer,
        payee: data.info.payee,
        arbiter: data.info.arbiter,
      })
    : 'other'

  const permissions = useEscrowPermissions(status, role, data.info)
  const onSuccess = data.refetch

  if (data.isError) return <small>Failed to fetch escrow state</small>

  return (
    <article className="rounded-lg border border-gray-200 p-4">
      <header className="mb-2 flex items-center justify-between gap-2">
        <div>
          <strong>Escrow </strong>
          <AddressBadge address={escrowAddress} length={10} />
        </div>
        {status && <StatusBadge status={status} />}
      </header>

      {data.isLoading && <small>Fetching escrow state…</small>}

      {data.info && (
        <ul className="space-y-1 list-none p-0 text-sm">
          <li>
            Payee: <AddressBadge address={data.info.payee} />
          </li>
          <li>
            Payer: <AddressBadge address={data.info.payer} />
          </li>
          <li>
            Arbiter: <AddressBadge address={data.info.arbiter} />
          </li>
          <li>Deadline: {Number(data.info.settleTime)}</li>
        </ul>
      )}

      {currentUser && (
        <section className="mt-4">
          {role === 'payer' && (
            <Payer.Widgets
              escrowAddress={escrowAddress}
              onSuccess={onSuccess}
              permissions={permissions}
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
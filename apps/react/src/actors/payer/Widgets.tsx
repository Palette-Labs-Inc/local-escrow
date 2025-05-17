import type { Address } from 'ox'
import { DisputeButton } from './DisputeButton.tsx'
import { RemoveDisputeButton } from './RemoveDisputeButton.tsx'
import { SettleForm } from './SettleForm.tsx'
import type { EscrowPermissionFlags } from '../../hooks/useEscrowPermissions.ts'

export function Widgets(props: Widgets.Props) {
  const { escrowAddress, onSuccess, permissions } = props
  const { canDispute, canRemoveDispute, canSettle } = permissions

  if (!(canDispute || canRemoveDispute || canSettle)) return null

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {canDispute && <DisputeButton escrowAddress={escrowAddress} onSuccess={onSuccess} />}
        {canRemoveDispute && (
          <RemoveDisputeButton escrowAddress={escrowAddress} onSuccess={onSuccess} />
        )}
      </div>

      {canSettle && <SettleForm escrowAddress={escrowAddress} onSuccess={onSuccess} />}
    </>
  )
}

export namespace Widgets {
  export interface Props {
    escrowAddress: Address.Address
    onSuccess: () => void
    permissions: EscrowPermissionFlags
  }
} 
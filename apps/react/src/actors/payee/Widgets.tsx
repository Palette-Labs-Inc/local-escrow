import type { Address } from 'ox'
import { RefundForm } from './RefundForm.tsx'
import type { EscrowPermissionFlags } from '../../hooks/useEscrowPermissions.ts'

export function Widgets({ escrowAddress, onSuccess, permissions }: Widgets.Props) {
  if (!permissions.canRefund) return null
  return <RefundForm escrowAddress={escrowAddress} onSuccess={onSuccess} />
}

export namespace Widgets {
  export interface Props {
    escrowAddress: Address.Address
    onSuccess: () => void
    permissions: EscrowPermissionFlags
  }
} 
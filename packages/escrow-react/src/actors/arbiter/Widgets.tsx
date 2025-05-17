import type { Address } from 'ox'
import { ResolveDisputeForm } from './ResolveDisputeForm.js'
import type { EscrowPermissionFlags } from '../../hooks/useEscrowPermissions.js'

export function Widgets({ escrowAddress, onSuccess, permissions }: Widgets.Props) {
  if (!permissions.canResolveDispute) return null
  return <ResolveDisputeForm escrowAddress={escrowAddress} onSuccess={onSuccess} />
}

export namespace Widgets {
  export interface Props {
    escrowAddress: Address.Address
    onSuccess: () => void
    permissions: EscrowPermissionFlags
  }
} 
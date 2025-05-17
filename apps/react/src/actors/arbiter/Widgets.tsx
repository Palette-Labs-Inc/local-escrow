import type { Address } from 'ox'
import { ResolveDisputeForm } from './ResolveDisputeForm.tsx'
import type { EscrowPermissionFlags } from '@local-escrow/react'

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
import { useMemo } from 'react'
import { getAllowedActions, type EscrowStatus, type UserRole } from '@local-escrow/core'

export interface EscrowPermissionFlags {
  canDispute: boolean
  canRemoveDispute: boolean
  canSettle: boolean
  canRefund: boolean
  canResolveDispute: boolean
}

export function useEscrowPermissions(status: EscrowStatus | undefined, role: UserRole, info?: { settled: boolean; disputed: boolean }): EscrowPermissionFlags {
  return useMemo(() => {
    if (!status) {
      return {
        canDispute: false,
        canRemoveDispute: false,
        canSettle: false,
        canRefund: false,
        canResolveDispute: false,
      }
    }

    const actions = getAllowedActions(status, role)

    if (info?.settled) {
      return {
        canDispute: false,
        canRemoveDispute: false,
        canSettle: false,
        canRefund: false,
        canResolveDispute: false,
      }
    }

    return {
      canDispute: actions.includes('dispute'),
      canRemoveDispute: actions.includes('removeDispute'),
      canSettle: actions.includes('settle') && !info?.disputed,
      canRefund: actions.includes('refund'),
      canResolveDispute: actions.includes('resolveDispute'),
    }
  }, [status, role, info])
} 
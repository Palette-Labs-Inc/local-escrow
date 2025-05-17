import type { Address } from 'ox'
import { useEscrowData } from '../hooks/useEscrowData.ts'
import { useEscrowState } from '../hooks/useEscrowState.ts'
import { useEscrowPermissions } from '../hooks/useEscrowPermissions.ts'
import { getUserRole } from '@local-escrow/core'

export function useEscrow(params: {
  escrowAddress: Address.Address
  currentUser?: Address.Address
  payee: Address.Address
  arbiter: Address.Address
}) {
  const { escrowAddress, currentUser, payee, arbiter } = params

  const data = useEscrowData({ escrowAddress })
  const status = useEscrowState(data.info)

  const role = getUserRole({
    currentUser,
    payer: data.info?.payer,
    payee,
    arbiter,
  })

  const permissions = useEscrowPermissions(status, role, data.info)

  return {
    // raw contract info
    info: data.info,
    status,
    userRole: role,
    isExpired: status === 'expired',

    // query state
    isLoading: data.isLoading,
    isError: data.isError,
    refetch: data.refetch,

    // permission flags
    ...permissions,
  } as const
}
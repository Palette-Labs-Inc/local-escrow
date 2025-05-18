import type { EscrowStatus, UserRole, EscrowAction } from './types.js'

/**
 * Allowed state transitions describing which actions a role may take in a given escow status.
 */
export const stateTransitions: {
  [K in EscrowStatus]: { [R in UserRole]?: EscrowAction[] }
} = {
  pending: {
    payer: ['dispute', 'settle'],
    payee: ['refund'],
    arbiter: [],
  },
  disputed: {
    payer: ['removeDispute'],
    payee: [],
    arbiter: ['resolveDispute'],
  },
  expired: {
    payer: ['dispute', 'settle'],
    payee: ['settle', 'refund'],
    arbiter: [],
  },
  settled: {
    payer: [],
    payee: [],
    arbiter: [],
  },
}

/**
 * Return the set of allowed high-level actions for this user in the given state.
 */
export function getAllowedActions(
  status: EscrowStatus,
  role: UserRole,
): readonly EscrowAction[] {
  return stateTransitions[status][role] ?? []
}
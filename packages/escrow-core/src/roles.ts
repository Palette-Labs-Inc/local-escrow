import { Address } from 'ox'
import type { UserRole } from './types.js'


export function getUserRole(parameters: {
  currentUser?: Address.Address
  payer?: Address.Address
  payee?: Address.Address
  arbiter?: Address.Address
}): UserRole {
  const { currentUser, payer, payee, arbiter } = parameters

  if (!currentUser) return 'other'

  if (payer && Address.isEqual(currentUser, payer)) return 'payer'
  if (payee && Address.isEqual(currentUser, payee)) return 'payee'
  if (arbiter && Address.isEqual(currentUser, arbiter)) return 'arbiter'
  return 'other'
} 
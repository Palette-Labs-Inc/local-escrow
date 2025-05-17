import { RefundForm } from './RefundForm.js'
import { Widgets } from './Widgets.js'

/**
 * Namespace-style export for payee specific UI components.
 * Allows consumers to access them via `Payee.RefundForm`, `Payee.Widgets`, etc.
 */
export const Payee = {
  RefundForm,
  Widgets,
} as const

export {
  RefundForm,
  Widgets,
} 
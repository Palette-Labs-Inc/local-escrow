import { ResolveDisputeForm } from './ResolveDisputeForm.js'
import { Widgets } from './Widgets.js'

/**
 * Namespace-style export for arbiter specific UI components.
 * Consumers can use them via `Arbiter.ResolveDisputeForm`, `Arbiter.Widgets`, etc.
 */
export const Arbiter = {
  ResolveDisputeForm,
  Widgets,
} as const

export {
  ResolveDisputeForm,
  Widgets,
} 
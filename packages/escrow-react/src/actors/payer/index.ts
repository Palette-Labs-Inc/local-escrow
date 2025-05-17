import { DisputeButton } from './DisputeButton.js'
import { RemoveDisputeButton } from './RemoveDisputeButton.js'
import { SettleForm } from './SettleForm.js'
import { Widgets } from './Widgets.js'

/**
 * Aggregated namespace-style export that groups all payer specific UI primitives
 * so consumers can access them from a single object, e.g. `Payer.DisputeButton`.
 */
export const Payer = {
  DisputeButton,
  RemoveDisputeButton,
  SettleForm,
  Widgets,
} as const

// Individual re-exports – still useful for tree-shaking and named imports
export {
  DisputeButton,
  RemoveDisputeButton,
  SettleForm,
  Widgets,
} 
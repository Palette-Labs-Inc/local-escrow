import { Button as AriakitButton } from '@ariakit/react'
import type { Address } from 'ox'

import * as RemoveDispute from '../../lib/RemoveDispute.js'

export function RemoveDisputeButton(props: RemoveDisputeButton.Props) {
  const { escrowAddress, onSuccess } = props
  const { isPending, handle } = RemoveDispute.useAction({ escrowAddress, onSuccess })

  return (
    <AriakitButton
      type="button"
      disabled={isPending}
      onClick={handle}
      className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm bg-gray-50 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
    >
      Remove Dispute
    </AriakitButton>
  )
}

export namespace RemoveDisputeButton {
  export interface Props {
    escrowAddress: Address.Address
    onSuccess: () => void
  }
} 
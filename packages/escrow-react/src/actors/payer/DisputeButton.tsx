import { Button as AriakitButton } from '@ariakit/react'
import type { Address } from 'ox'

import * as Dispute from '../../lib/Dispute.js'

export function DisputeButton(props: DisputeButton.Props) {
  const { escrowAddress, onSuccess } = props
  const { isPending, handle } = Dispute.useAction({ escrowAddress, onSuccess })

  return (
    <AriakitButton
      type="button"
      disabled={isPending}
      onClick={handle}
      className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50"
    >
      Dispute
    </AriakitButton>
  )
}

export namespace DisputeButton {
  export interface Props {
    escrowAddress: Address.Address
    onSuccess: () => void
  }
}
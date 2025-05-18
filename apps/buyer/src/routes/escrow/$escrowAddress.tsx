import { createFileRoute } from '@tanstack/react-router'
import { Layout, useEscrowData } from '@local-escrow/react'
import { EscrowCard } from '#/components/EscrowCard'
import { useEscrowStore } from '#/store/escrow-store'
import type { Address } from 'ox'

export const Route = createFileRoute('/escrow/$escrowAddress')({
  component: EscrowPage,
})

function EscrowPage() {
  const { escrowAddress } = Route.useParams() as { escrowAddress: Address.Address }
  const { info, isLoading, isError } = useEscrowData({ escrowAddress })
  const { eventsByAccount } = useEscrowStore()

  if (isLoading) {
    return (
      <Layout.Content>
        <Layout.Header title="Escrow" />
        <p>Loading escrow details…</p>
      </Layout.Content>
    )
  }

  if (isError || !info) {
    return (
      <Layout.Content>
        <Layout.Header title="Escrow" />
        <p>Failed to load escrow details.</p>
      </Layout.Content>
    )
  }


  return (
    <Layout.Content>
      <Layout.Header title="Escrow" />
      <EscrowCard escrowAddress={escrowAddress} transactionHash={eventsByAccount[escrowAddress][0]?.transactionHash} />
    </Layout.Content>
  )
} 
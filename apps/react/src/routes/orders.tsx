import { createFileRoute } from '@tanstack/react-router'
import { EscrowList } from '../components/EscrowList.js'
import { Layout } from '@local-escrow/react'

export const Route = createFileRoute('/orders')({
  component: () => (
    <Layout.Content>
      <Layout.Header title="Orders" />
      <EscrowList />
    </Layout.Content>
  ),
}) 
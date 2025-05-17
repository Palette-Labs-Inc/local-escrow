import { createFileRoute } from '@tanstack/react-router'
import { EscrowList } from '../components/EscrowList'
import { Layout } from '../components/Layout'

export const Route = createFileRoute('/orders')({
  component: () => (
    <Layout.Content>
      <Layout.Header title="Orders" />
      <EscrowList />
    </Layout.Content>
  ),
}) 
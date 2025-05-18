import { createFileRoute } from '@tanstack/react-router'
import { CreateEscrow } from '#/components/CreateEscrow'
import { Layout } from '@local-escrow/react'

export const Route = createFileRoute('/shop')({
  component: () => (
    <Layout.Content>
      <Layout.Header title="Shop" />
      <CreateEscrow />
    </Layout.Content>
  ),
})
import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@local-escrow/react'
import CatalogList from '#/components/catalog/CatalogList'

export const Route = createFileRoute('/catalog')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout.Content>
      <Layout.Header title="Catalog" />
      <CatalogList />
    </Layout.Content>
  )
}

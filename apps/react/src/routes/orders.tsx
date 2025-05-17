import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orders')({
  component: () => <div className="p-6">Orders page</div>,
}) 
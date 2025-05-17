import { createFileRoute } from '@tanstack/react-router'
import { CreateEscrow } from '../components/CreateEscrow'

export const Route = createFileRoute('/shop')({
  component: () => (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Shop</h2>
      <CreateEscrow />
    </div>
  ),
}) 
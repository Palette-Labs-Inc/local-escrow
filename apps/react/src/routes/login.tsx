import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Connect } from '../components/Connect'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { isConnected } = useAccount()

  if (isConnected) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Connect />
    </div>
  )
} 
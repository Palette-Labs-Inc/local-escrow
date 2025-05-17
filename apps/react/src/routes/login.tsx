import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Connect } from '../components/Connect'
import { Layout } from '../components/Layout'
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
    <Layout.Content>
      <Layout.Header title="Login" />
      <Connect />
    </Layout.Content>
  )
} 
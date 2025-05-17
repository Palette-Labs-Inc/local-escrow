import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAccount } from 'wagmi'

export const Route = createFileRoute('/')({
  component: () => {
    const { isConnected } = useAccount()
    return <Navigate to={isConnected ? '/profile' : '/login'} replace />
  },
}) 
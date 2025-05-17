import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { Account } from '../components/Account'
import { TokenBalance } from '../components/Balance'
import { Mint } from '../components/Mint'
import { Connect } from '../components/Connect'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { isConnected } = useAccount()

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {isConnected ? (
        <>
          <Account />
          <TokenBalance />
          <Mint />
        </>
      ) : (
        <Connect />
      )}
    </div>
  )
} 
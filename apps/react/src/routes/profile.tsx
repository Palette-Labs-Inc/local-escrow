import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { Layout } from '../components/Layout'
import { Account } from '../components/Account'
import { TokenBalance } from '../components/Balance'
import { Mint } from '../components/Mint'
import { Connect } from '../components/Connect'
import { Permissions } from '../components/Permissions'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  const { isConnected } = useAccount()

  return (
    <Layout.Content>
      <Layout.Header title="Profile" />
      {isConnected ? (
        <>
          <Account />
          <TokenBalance />
          <Mint />
          <Permissions />
        </>
      ) : (
        <Connect />
      )}
    </Layout.Content>
  )
} 
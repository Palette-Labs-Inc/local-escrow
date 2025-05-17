import { createFileRoute } from '@tanstack/react-router'
import { useAccount } from 'wagmi'
import { Account, TokenBalance, Mint, Permissions, Layout } from '@local-escrow/react'
import { Connect } from '#/components/Connect'

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
import { exp1Address, exp1Config } from './contracts/contracts.ts'
import { useAccount, useReadContract } from 'wagmi'
import { Value } from 'ox'

/**
 * Fetches the EXP token balance for the currently connected wallet.
 *
 * Returns both the raw bigint value (to enable precise arithmetic) and a
 * human-readable string that is ready to display in the UI.
 */
export function useBalance() {
  const { address } = useAccount()

  // ---------------------------------------------------------------------------
  // Read the EXP balance from the chain every 2 seconds while a wallet is
  // connected. The bigint value is used for numerical comparisons while the
  // formatted version is suitable for display purposes.
  // ---------------------------------------------------------------------------
  const { data: balance } = useReadContract({
    abi: exp1Config.abi,
    functionName: 'balanceOf',
    address: exp1Address,
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 2_000,
    },
  })

  const raw = balance ?? 0n
  const formatted = `${Value.formatEther(raw)} EXP`

  return { raw, formatted }
}
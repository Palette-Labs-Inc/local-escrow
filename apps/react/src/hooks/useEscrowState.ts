import { useMemo } from 'react'
import type { EscrowInfo, EscrowStatus } from '@local-escrow/core'

export function useEscrowState(info?: EscrowInfo): EscrowStatus | undefined {
  return useMemo(() => {
    if (!info) return undefined

    if (info.settled) return 'settled'
    if (info.disputed) return 'disputed'

    const nowSec = BigInt(Math.floor(Date.now() / 1_000))
    if (nowSec >= info.settleTime) return 'expired'

    return 'pending'
  }, [info])
} 
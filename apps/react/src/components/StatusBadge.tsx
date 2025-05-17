import type { EscrowStatus } from '../lib/EscrowInfo.ts'

const STATUS_MAP: Record<EscrowStatus, { label: string; className: string }> = {
  settled: { label: 'Settled', className: 'bg-green-50 text-green-700' },
  disputed: { label: 'Disputed', className: 'bg-red-50 text-red-700' },
  pending: { label: 'Pending', className: 'bg-blue-50 text-blue-700' },
}

export interface StatusBadgeProps {
  status: EscrowStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = STATUS_MAP[status]
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{label}</span>
} 
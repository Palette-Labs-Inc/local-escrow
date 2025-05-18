import type { Hex } from 'ox'
import { truncateHexString } from '../utils.js'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export interface TransactionBadgeProps {
  transactionHash: Hex.Hex
  length?: number
}

export function TransactionBadge({ transactionHash, length = 6 }: TransactionBadgeProps) {
  const truncated = truncateHexString({ address: transactionHash, length })
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    /* istanbul ignore next */
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(transactionHash)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
      .catch(console.error)
  }

  return (
    <span className="inline-flex items-center space-x-1">
      <a
        href={`https://sepolia.basescan.org/tx/${transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded bg-blue-50 px-2 py-0.5 text-sm font-medium text-blue-700"
      >
        {truncated}
      </a>

      <button
        type="button"
        aria-label={copied ? 'Copied!' : 'Copy transaction hash to clipboard'}
        className="rounded p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={handleCopy}
      >
        {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
      </button>
    </span>
  )
}
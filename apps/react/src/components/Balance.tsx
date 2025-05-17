import * as Balance from '../lib/Balance'

export function TokenBalance() {
  const { formatted } = Balance.useExpBalance()

  return (
    <section className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Balance</h2>
      <div className="text-lg">
        <span className="text-gray-600">Balance: </span>
        <span className="font-semibold">{formatted} EXP</span>
      </div>
    </section>
  )
} 
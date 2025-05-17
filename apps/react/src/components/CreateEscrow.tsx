import { encodeFunctionData } from 'viem'
import { useAccount, useSendCalls, useCallsStatus, type BaseError } from 'wagmi'
import { Button } from '@ariakit/react'
import { EscrowFactory } from '@local-escrow/contracts'
import * as EscrowEvents from '#/components/EscrowEvents'

const buttonClassName =
	'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50'

export function CreateEscrow() {
	const { address } = useAccount()
	const { data, error, isPending, sendCalls } = useSendCalls()

	const {
		data: statusData,
		isLoading: isConfirming,
		isSuccess: isConfirmed,
	} = useCallsStatus({
		id: data?.id as string,
		query: { enabled: !!data },
	})

	EscrowEvents.useWatchEscrowEvents({ statusData })

	if (!address) return null

	const calldata = encodeFunctionData({
		abi: EscrowFactory.abi,
		functionName: 'createEscrow',
		args: [address, address, address],
	})

	return (
		<section className="rounded-lg border border-gray-200 p-4">
			<h2 className="text-xl font-semibold mb-4">Create Escrow</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					sendCalls({
						calls: [{ data: calldata, to: EscrowFactory.address }],
					})
				}}
				className="space-y-4"
			>
				<Button
					disabled={isPending}
					type="submit"
					className={buttonClassName}
				>
					{isPending ? 'Confirming...' : 'Create Escrow'}
				</Button>

				{data?.id && (
					<div className="text-sm">
						<span className="text-gray-600">Transaction Hash: </span>
						<span className="font-mono">{data.id}</span>
					</div>
				)}

				{isConfirming && (
					<div className="text-sm text-blue-600">Waiting for confirmation...</div>
				)}
				{isConfirmed && (
					<div className="text-sm text-green-600">Transaction confirmed.</div>
				)}
				{error && (
					<div className="text-sm text-red-600">
						Error: {(error as BaseError).shortMessage || error.message}
					</div>
				)}
			</form>

			{/* Transaction hashes list removed as per request */}
		</section>
	)
}
import { encodeFunctionData } from 'viem'
import {
	useAccount,
	useSendCalls,
	useCallsStatus,
	type BaseError,
	useTransactionReceipt,
} from 'wagmi'
import { Button } from '@ariakit/react'
import { EscrowFactory } from '@local-escrow/contracts'
import * as EscrowEvents from '#/components/EscrowEvents'
import { TransactionBadge } from '@local-escrow/react'
import { Json, type Hex } from 'ox'
import { router } from '#/lib/Router'
import { baseSepolia } from 'viem/chains'

const buttonClassName =
	'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50'

export function CreateEscrow() {
	const { address } = useAccount()
	const { data, error, isPending, sendCalls } = useSendCalls()

	const {
		isLoading: isConfirming,
		isSuccess: isConfirmed,
	} = useCallsStatus({
		id: data?.id as string,
		query: { enabled: !!data },
	})

	EscrowEvents.useWatchEscrowEvents({
		onEvent: (eventInfo) => {
			console.log('eventInfo in onEvent', Json.stringify(eventInfo, null, 2))
			console.log('data in onEvent', Json.stringify(data, null, 2))
			router.navigate({
				to: '/escrow/$escrowAddress',
				params: { escrowAddress: eventInfo.escrowAddress },
			})
		},
	})

	if (!address) return null

	return (
		<section className="rounded-lg border border-gray-200 p-4">
			<h2 className="text-xl font-semibold mb-4">Create Escrow</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					sendCalls({
						calls: [{ 
							data: encodeFunctionData({
								abi: EscrowFactory.abi,
								functionName: 'createEscrow',
								args: [address, address, address],
							}), 
							to: EscrowFactory.address 
						}],
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
						<TransactionBadge transactionHash={data.id as Hex.Hex} />
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
		</section>
	)
}
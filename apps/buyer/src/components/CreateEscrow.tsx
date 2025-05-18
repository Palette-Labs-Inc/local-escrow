import { encodeFunctionData } from "viem";
import {
	useAccount,
	useSendCalls,
	useCallsStatus,
	type BaseError,
} from "wagmi";
import { Button } from "@ariakit/react";
import { EscrowFactory } from "@local-escrow/contracts";
import * as EscrowEvents from "#/lib/EscrowEvents";
import { TransactionBadge } from "@local-escrow/react";
import type { Hex } from "ox";
import * as Router from "#/lib/Router";
import { useState } from "react";

const buttonClassName =
	"inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50";

export function CreateEscrow() {
	const { address } = useAccount();
	const { data, error, isPending, sendCalls } = useSendCalls();
	const [isWaitingForEvent, setIsWaitingForEvent] = useState(false);

	const { isLoading, isSuccess } = useCallsStatus({
		id: data?.id as string,
		query: {
			enabled: !!data,
		},
	})

	const isCreatingEscrow = isPending || isWaitingForEvent;

	EscrowEvents.useWatchEscrowEvents({
		onEvent: (eventInfo) => {
			setIsWaitingForEvent(false);
			Router.router.navigate({
				to: "/escrow/$escrowAddress",
				params: { escrowAddress: eventInfo.escrowAddress },
			});
		},
	});

	if (!address) return null;

	return (
		<section className="rounded-lg border border-gray-200 p-4">
			<h2 className="text-xl font-semibold mb-4">Place Order</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					setIsWaitingForEvent(true);
					sendCalls({
						calls: [
							{
								data: encodeFunctionData({
									abi: EscrowFactory.abi,
									functionName: "createEscrow",
									args: [address, address, address],
								}),
								to: EscrowFactory.address,
							},
						],
					});
				}}
				className="space-y-4"
			>
				<Button disabled={isCreatingEscrow} type="submit" className={buttonClassName}>
					{isCreatingEscrow ? "Creating Escrow..." : "Place Order"}
				</Button>

				{data?.id && (
					<div className="text-sm">
						<span className="text-gray-600">Transaction Hash: </span>
						<TransactionBadge transactionHash={data.id as Hex.Hex} />
					</div>
				)}

				{isLoading && (
					<div className="text-sm text-blue-600">
						Waiting for confirmation...
					</div>
				)}
				{isWaitingForEvent && isSuccess && (
					<div className="text-sm text-blue-600">
						Waiting for escrow creation...
					</div>
				)}
				{error && (
					<div className="text-sm text-red-600">
						Error: {(error as BaseError).shortMessage || error.message}
					</div>
				)}
			</form>
		</section>
	);
}
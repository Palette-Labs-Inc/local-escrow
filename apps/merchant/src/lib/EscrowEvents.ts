import { useAccount, useWatchContractEvent } from "wagmi";
import { EscrowFactory } from "@local-escrow/contracts";
import { type EscrowEventInfo, useEscrowStore } from "#/store/escrow-store";
import { Json, type Hex } from "ox";
import { decodeEventLog, type Log } from "viem";

export function useWatchEscrowEvents(parameters?: useWatchEscrowEvents.Parameters) {
  const { onEvent } = parameters || {};
  const { address: currentUser } = useAccount();
  const { addEvent } = useEscrowStore();

  useWatchContractEvent({
    address: EscrowFactory.address,
    abi: EscrowFactory.abi,
    eventName: "EscrowCreated",
    args: { storefront: currentUser },
    pollingInterval: 1_000,
    onLogs(logs: Log[]) {
      if (!currentUser) return

      for (const log of logs) {
        const { args: logArgs } = decodeEventLog({
          abi: EscrowFactory.abi,
          topics: log.topics,
          data: log.data,
        })
        
        const eventInfo = {
          ...logArgs,
          blockNumber: log.blockNumber ?? undefined,
          transactionHash: log.transactionHash as Hex.Hex | undefined,
        }

        console.log('[EscrowEvents] eventInfo', Json.stringify(eventInfo, null, 2))

        addEvent(currentUser, eventInfo)
        onEvent?.(eventInfo)
      }
    },
  });
  
  return {
    isWatching: !!currentUser,
  } as const;
}

export declare namespace useWatchEscrowEvents {
  export type Parameters = {
    onEvent?: (eventInfo: EscrowEventInfo) => void;
  };
} 
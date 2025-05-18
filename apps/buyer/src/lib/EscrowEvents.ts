import { useAccount, useWatchContractEvent, type UseCallsStatusReturnType } from "wagmi";
import { EscrowFactory } from "@local-escrow/contracts";
import { type EscrowEventInfo, useEscrowStore } from "#/store/escrow-store";

export function useWatchEscrowEvents(parameters?: useWatchEscrowEvents.Parameters) {
  const { onEvent } = parameters || {};
  const { address: currentUser } = useAccount();
  const { addEvent } = useEscrowStore();

  useWatchContractEvent({
    address: EscrowFactory.address as `0x${string}`,
    abi: EscrowFactory.abi,
    eventName: 'EscrowCreated',
    args: currentUser ? { payee: currentUser } : undefined,
    onLogs(logs) {
      if (!currentUser) return
      for (const log of logs) {
        const eventInfo = log.args as EscrowEventInfo
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
    statusData?: UseCallsStatusReturnType["data"];
  };
}

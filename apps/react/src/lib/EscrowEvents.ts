import { useAccount, useWatchContractEvent, type UseCallsStatusReturnType } from "wagmi";
import type { Log } from "viem";
import EscrowFactory from "../contracts/EscrowFactory.ts";
import { useEscrowStore } from "../store/escrow-store.ts";
import type { Address, Hex } from "ox";

export function useWatchEscrowEvents(parameters?: useWatchEscrowEvents.Parameters) {
  const { onEvent, statusData } = parameters || {};
  const { address: currentUser } = useAccount();
  const { addEvent } = useEscrowStore();

  useWatchContractEvent({
    address: EscrowFactory.address as `0x${string}`,
    abi: EscrowFactory.abi,
    eventName: "EscrowCreated",
    args: currentUser ? { payee: currentUser } : undefined,
    onLogs(logs: readonly Log[]) {
      if (!currentUser) return;

      for (const log of logs) {
        const { escrowAddress, payee, storefront, arbiter } = (
          log as unknown as { args: unknown }
        ).args as {
          escrowAddress: Address.Address;
          payee: Address.Address;
          storefront: Address.Address;
          arbiter: Address.Address;
        };

        const eventInfo = {
          escrowAddress,
          payee,
          storefront,
          arbiter,
          blockNumber: log.blockNumber ?? undefined,
          transactionHash: log.transactionHash as `0x${string}` | undefined,
          status: statusData?.status,
        }

        addEvent(currentUser, eventInfo);
        
        onEvent?.(eventInfo);
      }
    },
  });
  
  return {
    isWatching: !!currentUser,
  } as const;
}

export declare namespace useWatchEscrowEvents {
  export type Parameters = {
    onEvent?: (eventInfo: {
      escrowAddress: Address.Address;
      payee: Address.Address;
      storefront: Address.Address;
      arbiter: Address.Address;
      blockNumber?: bigint;
      transactionHash?: Hex.Hex;
      status?: string;
    }) => void;
    statusData?: UseCallsStatusReturnType["data"];
  };
} 
import { useAccount, useWatchContractEvent } from "wagmi";
import type { Log } from "viem";
import EscrowFactory from "../../contracts/EscrowFactory.ts";
import { useEscrowStore } from "../../store/escrow-store.ts";

/**
 * Watches EscrowCreated events emitted by the EscrowFactory and persists
 * them in the zustand escrow store, grouped by connected wallet address.
 *
 * The hook is idempotent – it can be called many times without registering
 * duplicate listeners.
 */
export function useWatchEscrowEvents() {
  const { address: currentUser } = useAccount();
  const { addEvent } = useEscrowStore();

  useWatchContractEvent({
    address: EscrowFactory.address as `0x${string}`,
    abi: EscrowFactory.abi,
    eventName: "EscrowCreated",
    args: currentUser ? { payee: currentUser } : undefined,
    onLogs(logs: readonly Log[]) {
      if (!currentUser) return;

      // eslint-disable-next-line no-console
      console.debug("[useWatchEscrowEvents] listener received", logs);

      for (const log of logs) {
        const { escrowAddress, payee, storefront, arbiter } = (
          log as unknown as { args: unknown }
        ).args as {
          escrowAddress: `0x${string}`;
          payee: `0x${string}`;
          storefront: `0x${string}`;
          arbiter: `0x${string}`;
        };

        addEvent(currentUser, {
          escrowAddress,
          payee,
          storefront,
          arbiter,
          blockNumber: log.blockNumber ?? undefined,
          transactionHash: log.transactionHash as `0x${string}` | undefined,
        });
      }
    },
  });
} 
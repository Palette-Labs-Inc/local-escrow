import { useAccount } from "wagmi";
import * as EscrowEvents from "#/lib/EscrowEvents";
import { EscrowCard } from "#/components/EscrowCard";
import { useEscrowStore } from "#/store/escrow-store";

export function EscrowList() {
  const { address } = useAccount()
  const { eventsByAccount } = useEscrowStore()
  EscrowEvents.useWatchEscrowEvents()

  if (!address) {
    return <h3>Please connect your wallet to view escrows</h3>;
  }

  const events = eventsByAccount[address] || [];

  if (events.length === 0) {
    return <h3>No orders found for this account</h3>;
  }

  return (
    <section
      style={{
        display: "grid",
        gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {events.map((event) => (
        <EscrowCard key={event.escrowAddress} escrowAddress={event.escrowAddress} />
      ))}
    </section>
  );
}

export namespace EscrowList {
  export type Props = Record<string, never>;
} 
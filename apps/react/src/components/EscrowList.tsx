import { useAccount } from "wagmi";
import * as EscrowEvents from "./EscrowEvents.js";
import { EscrowCard } from "./EscrowCard.js";
import { useEscrowStore } from "../store/escrow-store.js";

export function EscrowList() {
  const { address } = useAccount()
  const { eventsByAccount } = useEscrowStore()
  EscrowEvents.useWatchEscrowEvents()

  if (!address) {
    return <h3>Please connect your wallet to view escrows</h3>;
  }

  const events = eventsByAccount[address] || [];

  if (events.length === 0) {
    return <h3>No escrows found for this account</h3>;
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
        <EscrowCard key={event.escrowAddress} event={event} />
      ))}
    </section>
  );
}

export namespace EscrowList {
  export type Props = Record<string, never>;
} 
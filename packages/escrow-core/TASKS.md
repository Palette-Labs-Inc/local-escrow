
Below is a structured review and some concrete re-organisation ideas.  
I focus on SOLID, React best-practices, and a possible “actor oriented” design that keeps the buyer-app thin and declarative.

────────────────────────────────────────
1.  Current strengths
────────────────────────────────────────
•	All on-chain reads are wrapped in hooks, the UI never touches wagmi directly.  
•	Side-effect hooks (`useSendCalls`) are colocated with the forms that trigger them.  
•	TypeScript types are explicit and contract ABIs are imported once.  
•	UI renders are entirely driven by derived state (`canDispute`, `canSettle` …).

These are good foundations; the complexity you feel is mostly “domain logic” creeping into UI hooks.  That is where we can improve.

────────────────────────────────────────
2.  Main pain-points
────────────────────────────────────────
A.	Mixed responsibilities  
   • `useEscrow` performs data fetching, derives status, **and** maps permissions.  
   • Each `*Action.ts` file constructs transactions **and** polls for completion.  
   • `EscrowCard` chooses which buttons/forms to show, so UI logic changes when business rules change.

B.	Duplicate logic  
   • All action hooks repeat the “send calls + poll + onSuccess” boiler-plate.  
   • Form components (`SettleEscrowForm`, `RefundForm`, `ResolveDisputeForm`) are very similar.

C.	Hard-coded rules  
   • `stateTransitions` lives inside React code; unit-testing it in isolation is harder.  
   • Permission logic is scattered (mapping in `useEscrow`, button checks in `EscrowCard`, modifiers in Solidity).

────────────────────────────────────────
3.  Proposed architecture
────────────────────────────────────────
Think of the app in **three layers** and keep each layer SOLID-single-purpose.

Layer 1 – Domain (Pure TypeScript, no React)  
•	`escrow-machine.ts` – a finite-state machine describing states, events, and transitions.  XState or a hand-rolled reducer both work.  
•	`roles.ts` – helper to map an `address` to `'payer' | 'payee' | 'arbiter' | 'other'`.  
•	`permissions.ts` – pure functions:  
  `getAllowedActions(state, role): EscrowAction[]`.  
These files are 100 % unit-testable and re-usable on server or React Native.

Layer 2 – Adapters (React hooks)  
•	`useEscrowData` – only runs `useReadContracts` and returns raw contract fields.  
•	`useEscrowState` – takes raw data ⇒ calculates the current FSM state (`'pending' | 'expired' …`).  
•	`useEscrowPermissions` – bridges Layer 1 FSM + current role and returns `canDispute…` flags.  
•	`useEscrowAction` (generic) – receives `{ escrowAddress, fn: 'settle', args: [...] }` and wraps:
    1.	sendCalls  
    2.	status polling  
    3.	onSuccess refetch  
   All concrete hooks (`useDispute`, `useRemoveDispute` …) become 1-liners that call it.

Layer 3 – Presentation  
•	`<EscrowCard>` becomes a purely declarative renderer:

```tsx
<EscrowCard escrow={escrow} currentUser={address} />
```

Internally it does:

```tsx
const { state } = useEscrowState(escrowAddress)
const role = useUserRole({ currentUser, escrow })
const permissions = useEscrowPermissions({ state, role })
```

and shows the allowed components.  If tomorrow the business rule changes, _only_ `permissions.ts` changes.

Actor namespaces  
Create a folder per actor to group components that belong to a user role and make permissions explicit:

```
/actors
  /payer
     PayButton.tsx
     DisputeButton.tsx
  /payee
     RefundForm.tsx
     SettleForm.tsx
  /arbiter
     ResolveDisputeForm.tsx
```

Each file exports a component that already knows it is allowed to render (because Layer 2 hooks did the check).  `<EscrowCard>` just imports all three actor sections and renders them; whichever returns `null` is automatically hidden.

────────────────────────────────────────
4.  File tree snapshot (illustrative)
────────────────────────────────────────
```
src/
 ├─ domain/
 │   ├─ escrow-machine.ts
 │   ├─ roles.ts
 │   └─ permissions.ts
 ├─ hooks/
 │   ├─ useEscrowData.ts
 │   ├─ useEscrowState.ts
 │   ├─ useEscrowPermissions.ts
 │   ├─ useEscrowAction.ts
 │   └─ actions/
 │       ├─ useDispute.ts
 │       ├─ useRemoveDispute.ts
 │       └─ ...
 ├─ actors/
 │   ├─ payer/
 │   │   └─ DisputeButton.tsx
 │   ├─ payee/
 │   │   └─ RefundForm.tsx
 │   └─ arbiter/
 │       └─ ResolveDisputeForm.tsx
 └─ components/
     └─ EscrowCard/
         └─ index.tsx
```

────────────────────────────────────────
5.  Benefits
────────────────────────────────────────
•	Each file has one reason to change (SRP).  
•	UI tests only mount presentation components; domain rules are unit-tested separately.  
•	New actions (e.g. “proposeArbiter”) touch only domain + one new actor component.  
•	Permissions are enforced uniformly—no chance of “button shows but tx reverts”.

────────────────────────────────────────
6.  Smaller refactors you can do today
────────────────────────────────────────
1.	Extract the polling pattern into `useTransactionStatus(id, onSuccess)` to delete 30+ repeated lines.  
2.	Move `stateTransitions` and `getUserRole` out of `useEscrow` so the hook only fetches data.  
3.	Co-locate contract ABIs in `contracts/abi/` and generate TypeScript types with `viem` codegen to avoid the manual `as const` casting.  
4.	Add unit tests for `permissions.ts` – these will fail immediately when you change a Solidity modifier but forget to update front-end rules.

────────────────────────────────────────
7.  Next steps
────────────────────────────────────────
1.	Start by moving the pure helpers (`getUserRole`, `stateTransitions`) into `domain/`.  
2.	Introduce a generic `useEscrowAction`.  Migrate one or two existing actions to prove the pattern and delete duplicated code.  
3.	Split `useEscrow` into `useEscrowData` + `useEscrowState`.  The diff is mechanical and safe.  
4.	Finally, convert each form/button into its actor folder and gate it with the new permissions hook.

This staged approach lets you ship incremental improvements without a risky rewrite.

Hope this gives you a clear path to a cleaner, more maintainable codebase.  Let me know if you want a concrete code example of any particular refactor!

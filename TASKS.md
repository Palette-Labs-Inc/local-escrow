# Refactor Progress – Local Escrow

- [x] Scaffold `@local-escrow/core` package with domain helpers (types, roles, permissions)
- [x] Add root `tsconfig.json` with workspace paths
- [x] Implement hooks layer inside `apps/react/src/hooks/`
  - [x] `useEscrowData`
  - [x] `useEscrowState`
  - [x] `useEscrowPermissions`
  - [x] `useEscrowAction`
- [x] Refactor `EscrowInfo.ts` to use new hooks & core helpers
- [x] Replace duplicated polling logic with generic `useEscrowAction` in action hooks:
  - [x] Dispute
  - [x] RemoveDispute
  - [x] Refund
  - [x] ResolveDispute
  - [x] Settle
- [ ] Verify forms & components compile against new API (`SettleEscrowForm`, `RefundForm`, `ResolveDisputeForm`, `EscrowCard`)
- [ ] Remove `any` cast by encoding calldata & simplifying `ContractCall` type
- [ ] Introduce actor-oriented folder structure (`actors/`) – optional follow-up
- [ ] Add unit tests in `packages/escrow-core` 
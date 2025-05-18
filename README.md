# Local Escrow System: Parameter Mismatch Analysis & Fix Plan

## Current Issue

There's a parameter naming mismatch between the frontend, factory contract, and escrow contract that creates confusion:

1. **Incorrect Role Assignment**: The buyer ends up being set as both the payer AND payee in the escrow.
2. **Event Filtering Problems**: Unable to filter events by the actual payer (buyer).
3. **Confusing Parameter Names**: `storefront` vs `payee` creates confusion about their actual roles.

## Contract Analysis

### SimpleEscrow.sol
```solidity
function initialize(address _payee, address _arbiter, address _payer, uint256 settleDeadline) external {
    payee = _payee;
    arbiter = _arbiter;
    payer = _payer;
    ...
}
```

### EscrowFactory.sol
```solidity
function createEscrow(
    address payee,
    address storefront, 
    address arbiter
) external returns (address) {
    // ...
    SimpleEscrow(clonedEscrow).initialize(payee, arbiter, msg.sender, 1749073605);
    // ...
    emit EscrowCreated(clonedEscrow, payee, storefront, arbiter);
    // ...
}
```

### Event Declaration
```solidity
event EscrowCreated(address indexed escrowAddress, address indexed payee, address indexed storefront, address arbiter);
```

## The Problem Flow

1. Frontend calls `createEscrow(buyerAddress, merchantAddress, arbiterAddress)`
2. Factory passes `buyerAddress` as `payee` to the escrow
3. Factory sets `msg.sender` (also buyer) as `payer`
4. Result: both `payee` and `payer` are the buyer's address
5. Event doesn't include the actual `payer` as an indexed parameter, making filtering contract events by Buyer impossible

## Comprehensive Fix Plan

### 1. Contract Fix (Factory)

```solidity
// RENAME parameters to match their actual roles
function createEscrow(
    address merchant, // Was confusingly named "payee"
    address buyer,    // Was confusingly named "storefront"
    address arbiter
) external returns (address) {
    // Send merchant as payee, current sender as payer
    SimpleEscrow(clonedEscrow).initialize(merchant, arbiter, msg.sender, 1749073605);
    
    // Include actual payer in the event
    emit EscrowCreated(clonedEscrow, merchant, msg.sender, arbiter);
    return clonedEscrow;
}
```

### 2. Redefine Event

```solidity
// Change event to include payer as indexed parameter instead of storefront
event EscrowCreated(address indexed escrowAddress, address indexed payee, address indexed payer, address arbiter);
```

### 3. Frontend Fix (CreateEscrow.tsx)

```typescript
// Swap argument order to match expected roles
args: [storefront as Address.Address, address as Address.Address, arbiter as Address.Address]
```

### 4. Event Listener Fix (EscrowEvents.ts)

```typescript
// For buyer app
args: { payer: currentUser }

// For merchant app
args: { payee: currentUser }
```

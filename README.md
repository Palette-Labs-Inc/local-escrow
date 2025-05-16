# atmerchant

[33mGranting permissions is an **on-chain** operation.[0m It stores the delegated key & policy in the Porto smart-account contract and therefore consumes a small amount of gas paid by the account itself.

`grantEscrowSignerPermissions()` wraps the following provider request into a transaction sent **from your smart-account address**:

```ts
provider.request({
  method: 'experimental_grantPermissions',
  params: [ { /* expiry, key, scopes… */ } ],
})
```

Execution sequence:

1. Porto's browser/provider shows a UI prompt so the wallet owner can approve the delegation.
2. Once confirmed, Porto serialises the permission object into calldata and sends a **real transaction** where `from == <smart-account>`.
3. The smart-account contract persists the permission to its storage. You will receive a tx hash and pay a small gas fee in Base-Sepolia ETH.

Only after this on-chain step succeeds can the delegated key be used with `wallet_prepareCalls` ➜ `wallet_sendPreparedCalls`.

## Funding requirements & token usage

- All **gas fees** on Base Sepolia are paid in the native coin (ETH).
- ERC-20s such as EXP are *only* the value held or transferred by the escrow; they **cannot** pay gas.
- Practical checklist:
  1. *First*, the user should open the app and accept the **Grant Permissions** prompt. This authorises Porto to execute `EscrowFactory.createEscrow` on behalf of the delegated key.
  2. Fund the *payer's* wallet (the **connected Porto account address**) with a small amount of Base-Sepolia ETH (faucet is fine). *Do not* fund the delegated key—gas is always paid by the smart account, never by the delegate.
  3. Mint or transfer EXP to that same wallet so the escrow has something to lock up.
  4. The delegated signer derived from `VITE_ESCROW_SIGNER_PRIVATE_KEY` still does **not** need ETH—it only produces signatures off-chain.

## Token compatibility

`SimpleEscrow` accepts any ERC-20 token out-of-the-box.

```solidity
function _transferPayment(address to, address token, uint256 amount) private {
    if (token == address(0))        // native ETH path
        payable(to).transfer(amount);
    else                            // ERC-20 path
        IERC20(token).safeTransfer(to, amount);
}
```

If you transfer EXP (or another ERC-20) into the cloned escrow contract, all settlement/refund paths will work automatically.

## Escrow creation flow recap
1. `grantEscrowSignerPermissions()` – **on-chain**; stores the permission record in the smart-account contract (costs gas).
2. `wallet_prepareCalls` – hashes the intended call bundle.
3. Delegated signer signs the digest *locally*.
4. `wallet_sendPreparedCalls` – broadcasts an on-chain transaction; gas is paid from the caller's ETH balance within the spend-limit.

This sequence lets the UI create escrows while keeping the heavy-weight EOA key offline and tightly scoped.

## Delegated signer setup (local development)

### 1. Generate a fresh key

Run the helper script from the repo root:

```bash
pnpm tsx scripts/gen-escrow-key.ts
```

What it does:

1. Produces a new random secp256k1 private key.
2. Writes it to `apps/vite-react/.env.local` as
   `VITE_ESCROW_SIGNER_PRIVATE_KEY=0x…`.
3. Prints the derived public address so you can fund it.

The script refuses to overwrite an existing `.env.local`, keeping you from
accidentally nuking a funded key.

**Never commit `.env.local` to Git—the file is already in `.gitignore`.**

### 2. Fund the key

Even though the delegated signer never sends raw transactions, Porto's wallet
contract will spend gas on its behalf when you create escrows. Send a small
amount of **Base-Sepolia ETH** (≈ 0.02 ETH is plenty) to the address printed by
the script. Faucets:

* https://sepolia.base.org/faucet
* https://faucet.quicknode.com/base/sepolia

### 3. Load EXP tokens (optional)

If you want to test escrow settlements with the demo token:

```bash
# in the UI press "Mint 100 EXP" or use the ABI directly:
cast send 0x29F45fc3eD1d0ffaFb5e2af9Cc6C3AB1555cd5a2 "mint(address,uint256)" <YOUR_ADDR> 100e18 --rpc-url <BASE_SEPOLIA_RPC>
```

The escrow clone must *hold* the token balance before anyone calls `settle`. You
can either transfer after creation or extend `EscrowFactory` to pull funds in
via `transferFrom`.

---

## Contract caveats & next steps

* `initialize` currently treats `settleDeadline` as **offset**, but
  `EscrowFactory` passes an absolute Unix timestamp (`1749073605`). Adjust one
  side so they agree (e.g. pass `30 days`).
* `NotStorefront` error is defined but never used. If storefront rules matter,
  thread the `storefront` value into `SimpleEscrow` functions.

Neither issue affects basic testing but might surface once you move beyond the
POC.

---

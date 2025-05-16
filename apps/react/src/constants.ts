import { Hex, Value, P256, PublicKey } from 'ox'
// import { exp1Address } from './contracts/contracts.ts'
import EscrowFactory from './contracts/EscrowFactory.ts'
import { exp1Config } from './contracts/contracts.ts'

// Base Sepolia chain ID (decimal & hex)
export const CHAIN_ID_DEC = 84_532
export const CHAIN_ID_HEX = Hex.fromNumber(CHAIN_ID_DEC)

export const permissions = () =>
	({
		expiry: Math.floor(Date.now() / 1_000) + 60 * 60 * 24 * 30, // 30 days
		key: {
			publicKey: getEscrowPublicKey(),
			type: 'p256' as const,
		},
		permissions: {
			calls: [
				{
					signature: 'approve(address,uint256)',
					to: exp1Config.address,
				},
				{
					signature: 'transfer(address,uint256)',
					to: exp1Config.address,
				},
			],
			spend: [
				{
					period: 'minute',
					token: exp1Config.address,
					limit: Hex.fromNumber(Value.fromEther('1000')),
				},
			],
		},
	}) as const;

/** Returns the app-managed P-256 private key used for delegated signing. */
export function getEscrowPrivateKey(): `0x${string}` {
	const pk = import.meta.env.VITE_ESCROW_SIGNER_PRIVATE_KEY as
		| `0x${string}`
		| undefined;

	if (!pk) throw new Error('⛔ VITE_ESCROW_SIGNER_PRIVATE_KEY is missing');
	return pk;
}

/** Derives the uncompressed public key (hex) from the private key. */
export function getEscrowPublicKey(): `0x${string}` {
	return PublicKey.toHex(P256.getPublicKey({ privateKey: getEscrowPrivateKey() }));
}

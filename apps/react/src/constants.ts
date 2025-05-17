import { Hex, Value, P256, PublicKey } from 'ox'
// import { exp1Address } from './contracts/contracts.ts'
import EscrowFactory from '../../../packages/contracts/src/EscrowFactory.ts'
import { exp1Address, exp1Config as ExperimentERC20 } from '../../../packages/contracts/src/contracts.ts'
import { parseEther } from 'viem'

// Base Sepolia chain ID (decimal & hex)
export const CHAIN_ID_DEC = 84_532
export const CHAIN_ID_HEX = Hex.fromNumber(CHAIN_ID_DEC)

export const permissions = () =>
	({
		chainId: CHAIN_ID_HEX,
		expiry: Math.floor(Date.now() / 1_000) + 60 * 60 * 24 * 30, // 30 days
		/*key: { // TODO: Test server generated P256 key
			publicKey: getEscrowPublicKey(),
			type: 'p256' as const,
		},*/
		permissions: {
			calls: [
				{
					signature: "createEscrow(address,address,address)",
					to: EscrowFactory.address as `0x${string}`,
				},
				{
					signature: 'approve(address,uint256)',
					to: ExperimentERC20.address as `0x${string}`,
				},
				{
					signature: 'transfer(address,uint256)',
					to: ExperimentERC20.address as `0x${string}`,
				},
			],
			spend: [
				{
					period: 'day',
					limit: Hex.fromNumber(Value.fromEther('0.01')),
				},
				{
					period: 'minute',
					token: ExperimentERC20.address as `0x${string}`,
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
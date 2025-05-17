import { exp1Address, exp1Config } from '../contracts/contracts.ts';
import { useAccount, useReadContract } from 'wagmi';
import { Value } from 'ox';

export function useExpBalance(address?: `0x${string}`) {
  const { address: accountAddress } = useAccount();
  const targetAddress = address ?? accountAddress;

  const { data: balance } = useReadContract({
    abi: exp1Config.abi,
    functionName: 'balanceOf',
    address: exp1Address,
    args: targetAddress ? [targetAddress] : undefined,
    query: {
      enabled: !!targetAddress,
      refetchInterval: 2_000,
    },
  });

  const raw = balance ?? 0n;
  const formatted = `${Value.formatEther(raw)} EXP`;

  return { raw, formatted };
} 
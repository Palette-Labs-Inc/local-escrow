import { useMemo } from "react";
import { useReadContracts, type UseReadContractsReturnType } from "wagmi";
import type { Address } from "ox";
import SimpleEscrow from "../contracts/SimpleEscrow.ts";

export type EscrowStatus = "settled" | "disputed" | "pending";

export interface EscrowInfo {
  payer: Address.Address;
  settled: boolean;
  disputed: boolean;
  settleTime: bigint;
}

export function useEscrowInfo(parameters: useEscrowInfo.Parameters) {
  const { escrowAddress } = parameters;
  
  const contracts = useMemo(
    () => [
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "payer" },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "isSettled" },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "isDisputed" },
      { address: escrowAddress, abi: SimpleEscrow.abi, functionName: "settleTime" },
    ] as const,
    [escrowAddress],
  );

  const result: UseReadContractsReturnType<typeof contracts> = useReadContracts({
    allowFailure: true,
    contracts,
  });

  const info = useMemo<EscrowInfo | undefined>(() => {
    if (!result.data || result.isLoading || result.isError) return undefined;
    const [payerRes, settledRes, disputedRes, settleTimeRes] = result.data.map((d) => (d as { result: unknown }).result) as [
      Address.Address,
      boolean,
      boolean,
      bigint,
    ];
    return { payer: payerRes, settled: settledRes, disputed: disputedRes, settleTime: settleTimeRes };
  }, [result.data, result.isLoading, result.isError]);

  const status: EscrowStatus | undefined = useMemo(() => {
    if (!info) return undefined;
    if (info.settled) return "settled";
    if (info.disputed) return "disputed";
    return "pending";
  }, [info]);

  return { ...result, info, status } as const;
}

export declare namespace useEscrowInfo {
  export type Parameters = {
    escrowAddress: Address.Address;
  }
} 
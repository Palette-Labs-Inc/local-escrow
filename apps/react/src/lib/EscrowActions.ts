import { useEffect } from "react";
import { useCallsStatus, useSendCalls, useAccount } from "wagmi";
import { parseEther } from "viem";
import { useFormStore } from "@ariakit/react";
import { Value } from "ox";
import type { Address } from "ox";

import SimpleEscrow from "../contracts/SimpleEscrow.ts";
import { exp1Abi, exp1Address } from "../contracts/contracts.ts";
import { useExpBalance } from "./Balance.ts";

export function useDisputeAction(parameters: useDisputeAction.Parameters) {
  const { escrowAddress, onSuccess } = parameters;
  
  const { isPending, sendCalls, data: txId } = useSendCalls();
  const { data: statusData } = useCallsStatus({
    id: txId?.id as string,
    query: {
      enabled: !!txId?.id,
      refetchInterval: (query) => (query.state.data?.status === "success" ? false : 1_000),
    },
  });

  useEffect(() => {
    if (statusData?.status === "success") {
      onSuccess();
    }
  }, [statusData, onSuccess]);

  const handleDispute = () => {
    sendCalls({ calls: [{ to: escrowAddress, abi: SimpleEscrow.abi, functionName: "dispute" }] });
  };

  return {
    isPending,
    handleDispute,
  } as const;
}

export declare namespace useDisputeAction {
  export type Parameters = {
    escrowAddress: Address.Address; 
    onSuccess: () => void;
  }
}

export function useRemoveDisputeAction(parameters: useRemoveDisputeAction.Parameters) {
  const { escrowAddress, onSuccess } = parameters;
  
  const { isPending, sendCalls, data: txId } = useSendCalls();
  const { data: statusData } = useCallsStatus({
    id: txId?.id as string,
    query: {
      enabled: !!txId?.id,
      refetchInterval: (query) => (query.state.data?.status === "success" ? false : 1_000),
    },
  });

  useEffect(() => {
    if (statusData?.status === "success") {
      onSuccess();
    }
  }, [statusData, onSuccess]);

  const handleRemoveDispute = () => {
    sendCalls({
      calls: [
        { to: escrowAddress, abi: SimpleEscrow.abi, functionName: "removeDispute" },
      ],
    });
  };

  return {
    isPending,
    handleRemoveDispute,
  } as const;
}

export declare namespace useRemoveDisputeAction {
  export type Parameters = {
    escrowAddress: Address.Address; 
    onSuccess: () => void;
  }
}

export function useSettleForm() {
  const { address: currentUser } = useAccount();
  
  const { raw: balanceRaw } = useExpBalance(currentUser);
  
  const form = useFormStore({ defaultValues: { amount: "" } });
  const amountInput = (form.useValue as unknown as (name: string) => string)("amount");
  const amountWei = amountInput ? parseEther(amountInput) : 0n;

  const isAmountInvalid = !amountInput || amountWei === 0n || balanceRaw < amountWei;

  useEffect(() => {
    if (amountInput || balanceRaw === 0n) return;
    const tenWei = parseEther("10");
    const defaultAmt = balanceRaw >= tenWei ? "10" : Value.formatEther(balanceRaw);
    form.setValue("amount", defaultAmt);
  }, [balanceRaw, amountInput, form]);

  return {
    form,
    amountInput,
    amountWei,
    isAmountInvalid,
  } as const;
}

export function useSettleAction(parameters: useSettleAction.Parameters) {
  const { escrowAddress, amountWei, isAmountInvalid, onSuccess } = parameters;
  
  const { error, isPending, sendCalls, data: txId } = useSendCalls();
  const { data: statusData } = useCallsStatus({
    id: txId?.id as string,
    query: {
      enabled: !!txId?.id,
      refetchInterval: (query) => (query.state.data?.status === "success" ? false : 1_000),
    },
  });

  useEffect(() => {
    if (statusData?.status === "success") {
      onSuccess();
    }
  }, [statusData, onSuccess]);

  const handleSettle = () => {
    if (isPending || isAmountInvalid) return;
    sendCalls({
      calls: [
        {
          to: exp1Address,
          abi: exp1Abi,
          functionName: "transfer",
          args: [escrowAddress, amountWei],
        },
        {
          to: escrowAddress,
          abi: SimpleEscrow.abi,
          functionName: "settle",
          args: [exp1Address, amountWei],
        },
      ],
    });
  };

  return {
    error,
    isPending,
    statusData,
    handleSettle,
  } as const;
}

export declare namespace useSettleForm {
  export type Props = Record<string, never>;
}

export declare namespace useSettleAction {
  export type Parameters = {
    escrowAddress: Address.Address;
    amountWei: bigint;
    isAmountInvalid: boolean;
    onSuccess: () => void;
  }
} 
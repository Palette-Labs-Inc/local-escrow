import { Hooks } from "porto/wagmi";
import { permissions } from "../constants.ts";
import { useAccount, useConnectors } from "wagmi";
import { useEffect } from "react";

// -----------------------------------------------------------------------------
// Shared helpers
// -----------------------------------------------------------------------------

const PORTO_CONNECTOR_ID = "xyz.ithaca.porto" as const;

function getPortoConnector(connectors: ReturnType<typeof useConnectors>) {
  return connectors.find((x) => x.id === PORTO_CONNECTOR_ID);
}

// -----------------------------------------------------------------------------
// Account info (current connector, address, latest permissions)
// -----------------------------------------------------------------------------

export function useAccountInfo() {
  const connectors = useConnectors();
  const connector = getPortoConnector(connectors);
  const { address } = useAccount();

  const allPermissions = Hooks.usePermissions();
  const latestPermissions = allPermissions.data?.at(-1);

  return {
    connector,
    address,
    latestPermissions,
  } as const;
}

// -----------------------------------------------------------------------------
// Login - Connect existing wallet
// -----------------------------------------------------------------------------

export function useLogin(parameters?: useLogin.Parameters) {
  const { onSuccess } = parameters || {};
  const connectors = useConnectors();
  const connector = getPortoConnector(connectors);
  const connect = Hooks.useConnect();

  useEffect(() => {
    if (connect.status === "success") onSuccess?.();
  }, [connect.status, onSuccess]);

  async function login(params: { grantPermissions: boolean }) {
    const { grantPermissions } = params;
    return connect.mutateAsync({
      connector,
      grantPermissions: grantPermissions ? permissions() : undefined,
    });
  }

  return {
    login,
    status: connect.status,
    error: connect.error,
    isPending: connect.status === "pending",
  } as const;
}

export declare namespace useLogin {
  export type Parameters = {
    onSuccess?: () => void;
  };
}

// -----------------------------------------------------------------------------
// Signup - Register new wallet
// -----------------------------------------------------------------------------

export function useSignup(parameters?: useSignup.Parameters) {
  const { onSuccess } = parameters || {};
  const connectors = useConnectors();
  const connector = getPortoConnector(connectors);
  const connect = Hooks.useConnect();

  useEffect(() => {
    if (connect.status === "success") onSuccess?.();
  }, [connect.status, onSuccess]);

  function signup(params: { grantPermissions: boolean; label: string }) {
    const { grantPermissions, label } = params;
    return connect.mutate({
      connector,
      createAccount: { label },
      grantPermissions: grantPermissions ? permissions() : undefined,
    });
  }

  return {
    signup,
    status: connect.status,
    error: connect.error,
    isPending: connect.status === "pending",
  } as const;
}

export declare namespace useSignup {
  export type Parameters = {
    onSuccess?: () => void;
  };
}

// -----------------------------------------------------------------------------
// Logout - Disconnect from all connectors
// -----------------------------------------------------------------------------

export function useLogout(parameters?: useLogout.Parameters) {
  const { onSuccess } = parameters || {};
  const connectors = useConnectors();
  const connector = getPortoConnector(connectors);
  const disconnect = Hooks.useDisconnect();

  useEffect(() => {
    if (disconnect.status === "success") onSuccess?.();
  }, [disconnect.status, onSuccess]);

  async function logout() {
    // Attempt to disconnect every connector first
    await Promise.all(connectors.map((c) => c.disconnect().catch(() => {})));
    return disconnect.mutateAsync({ connector });
  }

  return {
    logout,
    status: disconnect.status,
    error: disconnect.error,
    isPending: disconnect.status === "pending",
  } as const;
}

export declare namespace useLogout {
  export type Parameters = {
    onSuccess?: () => void;
  };
} 
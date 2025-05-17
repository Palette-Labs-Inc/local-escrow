import { Button as AriakitButton } from "@ariakit/react";
import { Json } from "ox";
import type { Hex } from "ox";
import { truncateHexString } from "../utils.ts";
import type * as React from "react";

// Define button style for reuse
const buttonClassName =
  "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50 disabled:opacity-50";

// -----------------------------------------------------------------------------
// Root component - purely presentational container
// -----------------------------------------------------------------------------

export function Account(props: Account.Props) {
  const { children, error } = props;
  return (
    <div>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export namespace Account {
  export interface Props {
    children: React.ReactNode;
    error?: string;
  }

  // ---------------------------------------------------------------------------
  // Header - Status display
  // ---------------------------------------------------------------------------
  export function Header(props: Header.Props) {
    return (
      <div className="flex items-end gap-2 mb-4">
        <h3 className="m-0">[client] wallet_connect</h3>|
        <p className="m-0">{props.status}</p>
      </div>
    );
  }

  export namespace Header {
    export interface Props {
      status: string;
    }
  }

  // ---------------------------------------------------------------------------
  // Controls - Permission toggle
  // ---------------------------------------------------------------------------
  export function Controls(props: Controls.Props) {
    const { grantPermissions, onTogglePermissions } = props;
    return (
      <p>
        <input
          type="checkbox"
          checked={grantPermissions}
          onChange={onTogglePermissions}
        />
        Grant Permissions
      </p>
    );
  }

  export namespace Controls {
    export interface Props {
      grantPermissions: boolean;
      onTogglePermissions: () => void;
    }
  }

  // ---------------------------------------------------------------------------
  // Login
  // ---------------------------------------------------------------------------
  export function Login(props: Login.Props) {
    const { isConnectPending, onLogin } = props;
    return (
      <AriakitButton
        disabled={isConnectPending}
        onClick={onLogin}
        className={buttonClassName}
        type="button"
      >
        Login
      </AriakitButton>
    );
  }

  export namespace Login {
    export interface Props {
      isConnectPending: boolean;
      onLogin: () => void;
    }
  }

  // ---------------------------------------------------------------------------
  // Signup
  // ---------------------------------------------------------------------------
  export function Signup(props: Signup.Props) {
    const { isConnectPending, onSignup } = props;
    return (
      <AriakitButton
        disabled={isConnectPending}
        onClick={onSignup}
        className={buttonClassName}
        type="button"
      >
        Register
      </AriakitButton>
    );
  }

  export namespace Signup {
    export interface Props {
      isConnectPending: boolean;
      onSignup: () => void;
    }
  }

  // ---------------------------------------------------------------------------
  // Logout
  // ---------------------------------------------------------------------------
  export function Logout(props: Logout.Props) {
    const { isDisconnectPending, onLogout } = props;
    return (
      <AriakitButton
        type="button"
        onClick={onLogout}
        className={buttonClassName}
        disabled={isDisconnectPending}
      >
        Disconnect
      </AriakitButton>
    );
  }

  export namespace Logout {
    export interface Props {
      isDisconnectPending: boolean;
      onLogout: () => void;
    }
  }

  // ---------------------------------------------------------------------------
  // Address Display
  // ---------------------------------------------------------------------------
  export function Address(props: Address.Props) {
    return <p>Account: {props.address}</p>;
  }

  export namespace Address {
    export interface Props {
      address: string;
    }
  }

  // ---------------------------------------------------------------------------
  // Details - Permissions display
  // ---------------------------------------------------------------------------
  export function Details(props: Details.Props) {
    const { publicKey, expiry, id, permissions } = props;
    return (
      <details className="mt-2" key={expiry + id}>
        <summary>
          <span className="mr-2">Permissions:</span>
          {truncateHexString({
            address: publicKey,
            length: 12,
          })}
        </summary>
        <pre>{Json.stringify(permissions, undefined, 2)}</pre>
      </details>
    );
  }

  export namespace Details {
    export interface Props {
      publicKey: Hex.Hex;
      expiry: number;
      id: string;
      permissions: Record<string, unknown>;
    }
  }
} 
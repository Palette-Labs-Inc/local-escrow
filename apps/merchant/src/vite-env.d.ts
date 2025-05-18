/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ESCROW_SIGNER_PRIVATE_KEY: `0x${string}`
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

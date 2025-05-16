#!/usr/bin/env bash
URL="https://base-sepolia.rpc.ithaca.xyz"

# Core node methods
core_methods=(
  web3_clientVersion rpc.discover rpc_modules net_version net_peerCount net_listening
  eth_chainId eth_blockNumber eth_protocolVersion eth_syncing eth_gasPrice eth_estimateGas
  eth_getBalance eth_getTransactionCount eth_call eth_getLogs
)

# Porto wallet namespace
wallet_methods=(
  wallet_getCapabilities wallet_health wallet_connect wallet_disconnect wallet_prepareCalls
  wallet_sendCalls wallet_sendPreparedCalls wallet_getCallsStatus
)

# Experimental methods
experimental_methods=(
  experimental_createAccount experimental_getAccountVersion experimental_getAdmins
  experimental_getPermissions experimental_grantAdmin experimental_grantPermissions
  experimental_revokeAdmin experimental_revokePermissions
)

id=1
rpc_call() {
  local method="$1"
  local params="$2"
  local payload="{\"jsonrpc\":\"2.0\",\"id\":$id,\"method\":\"$method\",\"params\":$params}"
  echo "#### $method ####"
  curl -s -X POST "$URL" -H "Content-Type: application/json" -d "$payload" | jq
  echo
  id=$((id+1))
}

echo "================ CORE METHODS ================\n"
for m in "${core_methods[@]}"; do
  case "$m" in
    eth_estimateGas)
      rpc_call "$m" "[{\"from\":\"0x0000000000000000000000000000000000000000\",\"to\":\"0x0000000000000000000000000000000000000000\",\"value\":\"0x0\",\"data\":\"0x\"}]"
      ;;
    eth_getBalance)
      rpc_call "$m" "[\"0x0000000000000000000000000000000000000000\",\"latest\"]"
      ;;
    eth_getTransactionCount)
      rpc_call "$m" "[\"0x0000000000000000000000000000000000000000\",\"latest\"]"
      ;;
    eth_call)
      rpc_call "$m" "[{\"to\":\"0x0000000000000000000000000000000000000000\",\"data\":\"0x\"},\"latest\"]"
      ;;
    eth_getLogs)
      rpc_call "$m" "[{\"fromBlock\":\"0x0\",\"toBlock\":\"latest\"}]"
      ;;
    *)
      rpc_call "$m" "[]"
      ;;
  esac
done

echo "================ WALLET METHODS ================\n"
for m in "${wallet_methods[@]}"; do
  rpc_call "$m" "[]"
done

echo "================ EXPERIMENTAL METHODS ================\n"
for m in "${experimental_methods[@]}"; do
  rpc_call "$m" "[]"
done

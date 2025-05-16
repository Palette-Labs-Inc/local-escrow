#!/usr/bin/env bash
URL="https://base-sepolia.rpc.ithaca.xyz"
methods=(web3_clientVersion rpc.discover rpc_modules net_version net_peerCount net_listening eth_chainId eth_blockNumber eth_protocolVersion eth_syncing eth_gasPrice wallet_getCapabilities)
id=1
for m in "${methods[@]}"; do
case "$m" in
eth_getBlockByNumber) payload="{\"jsonrpc\":\"2.0\",\"id\":$id,\"method\":\"$m\",\"params\":[\"latest\",false]}" ;;
*) payload="{\"jsonrpc\":\"2.0\",\"id\":$id,\"method\":\"$m\",\"params\":[]}" ;;
esac
echo "#### $m ####"
curl -s -X POST "$URL" -H "Content-Type: application/json" -d "$payload" | jq
echo
id=$((id+1))
done

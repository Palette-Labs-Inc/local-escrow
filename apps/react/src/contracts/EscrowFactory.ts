const EscrowFactory = {
  "contractName": "EscrowFactory",
  "address": "0x0f01298Ca1472Dc8FcE232e5611d57294aeFE904",
  "constructorArguments": [],
  "deploymentTime": "2025-05-05T22:43:37.829Z",
  "network": "basesepolia",
  "chainId": 84532,
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "FailedDeployment",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "InsufficientBalance",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "escrowAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "storefront",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "arbiter",
          "type": "address"
        }
      ],
      "name": "EscrowCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "payee",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "storefront",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "arbiter",
          "type": "address"
        }
      ],
      "name": "createEscrow",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "escrowImplementation",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
}
export default EscrowFactory
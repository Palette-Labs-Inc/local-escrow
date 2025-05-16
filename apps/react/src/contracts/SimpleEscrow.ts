const SimpleEscrow = {
  contractName: 'SimpleEscrow',
  address: '0xF6956080C043F1A868F545633ECdFA2157ccEBbD',
  constructorArguments: [],
  deploymentTime: '2025-05-05T22:43:37.830Z',
  network: 'basesepolia',
  chainId: 84532,
  abi: [
    {
      inputs: [],
      name: 'AlreadyInitialized',
      type: 'error',
    },
    {
      inputs: [],
      name: 'CannotDisputeSettledEscrow',
      type: 'error',
    },
    {
      inputs: [],
      name: 'CannotSettleYet',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotArbiter',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotAuthorized',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotDisputed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NotPayer',
      type: 'error',
    },
    {
      inputs: [],
      name: 'PaymentDisputed',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
      ],
      name: 'SafeERC20FailedOperation',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'disputeRemover',
          type: 'address',
        },
      ],
      name: 'DisputeRemoved',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'resolver',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'settled',
          type: 'bool',
        },
      ],
      name: 'DisputeResolved',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'disputeInitiator',
          type: 'address',
        },
      ],
      name: 'Disputed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'payer',
          type: 'address',
        },
      ],
      name: 'PayerSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Refunded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Settled',
      type: 'event',
    },
    {
      inputs: [],
      name: 'arbiter',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'dispute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_payee',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_arbiter',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_payer',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'settleDeadline',
          type: 'uint256',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'isDisputed',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'isSettled',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'payee',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'payer',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proposedArbiter',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'refund',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'removeDispute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bool',
          name: 'shouldSettle',
          type: 'bool',
        },
        {
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'resolveDispute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'settle',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'settleTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ] as const,
}
export default SimpleEscrow

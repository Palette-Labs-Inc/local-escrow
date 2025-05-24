
    const SimpleEscrow = {
  "abi": [
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "arbiter",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "dispute",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "initialize",
      "inputs": [
        {
          "name": "_payee",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_payer",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_arbiter",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "settleDeadline",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "isDisputed",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isRefunded",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isSettled",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "payee",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "payer",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "paymentAmount",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "paymentToken",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "proposedArbiter",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "refund",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "removeDispute",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "resolveDispute",
      "inputs": [
        {
          "name": "shouldSettle",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "settle",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "settleTime",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "DisputeRemoved",
      "inputs": [
        {
          "name": "disputeRemover",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "DisputeResolved",
      "inputs": [
        {
          "name": "resolver",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "settled",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Disputed",
      "inputs": [
        {
          "name": "disputeInitiator",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "PayerSet",
      "inputs": [
        {
          "name": "payer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Refunded",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "token",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Settled",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "token",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AlreadyInitialized",
      "inputs": []
    },
    {
      "type": "error",
      "name": "CannotDisputeSettledEscrow",
      "inputs": []
    },
    {
      "type": "error",
      "name": "CannotSettleYet",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotArbiter",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotAuthorized",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotDisputed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NotPayer",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PaymentAlreadyRefunded",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PaymentAlreadySettled",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PaymentDisputed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "SafeERC20FailedOperation",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        }
      ]
    }
  ],
  "bytecode": {
    "object": "0x6080604052348015600e575f80fd5b5061151e8061001c5f395ff3fe6080604052600436106100f6575f3560e01c8063779cd08311610089578063cf756fdf11610058578063cf756fdf146102cf578063edc97a75146102f7578063f240f7c31461030d578063fe25e00a14610323576100fd565b8063779cd0831461022957806389e1e82a14610253578063ae90b2131461027b578063c35905c6146102a5576100fd565b80633013ce29116100c55780633013ce29146101955780633270bb5b146101bf578063590e1ae3146101e957806366101b64146101ff576100fd565b80630335729e1461010157806311da60b41461012b578063123119cd146101415780632806347c1461016b576100fd565b366100fd57005b5f80fd5b34801561010c575f80fd5b5061011561034d565b6040516101229190611279565b60405180910390f35b348015610136575f80fd5b5061013f610360565b005b34801561014c575f80fd5b506101556106cb565b60405161016291906112d1565b60405180910390f35b348015610176575f80fd5b5061017f6106f0565b60405161018c91906112d1565b60405180910390f35b3480156101a0575f80fd5b506101a9610715565b6040516101b691906112d1565b60405180910390f35b3480156101ca575f80fd5b506101d361073b565b6040516101e09190611279565b60405180910390f35b3480156101f4575f80fd5b506101fd61074e565b005b34801561020a575f80fd5b5061021361091b565b6040516102209190611302565b60405180910390f35b348015610234575f80fd5b5061023d610921565b60405161024a9190611279565b60405180910390f35b34801561025e575f80fd5b5061027960048036038101906102749190611349565b610934565b005b348015610286575f80fd5b5061028f610c23565b60405161029c91906112d1565b60405180910390f35b3480156102b0575f80fd5b506102b9610c46565b6040516102c69190611302565b60405180910390f35b3480156102da575f80fd5b506102f560048036038101906102f091906113c8565b610c4c565b005b348015610302575f80fd5b5061030b610dd4565b005b348015610318575f80fd5b50610321610f20565b005b34801561032e575f80fd5b5061033761106e565b60405161034491906112d1565b60405180910390f35b600260149054906101000a900460ff1681565b600260149054906101000a900460ff16156103a7576040517f24dc589a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff16156103ee576040517fcc3a81a700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415801561049657505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156104cd576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610541576001600260156101000a81548160ff0219169083151502179055506105e8565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036105e757600260159054906101000a900460ff16806105b057506003544210155b6105e6576040517fc764a84f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b6106365f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546040516106c192919061142c565b60405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260159054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107d2576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260169054906101000a900460ff1615610819576040517f9c4cec8b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61086960015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b6001600260166101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660055460405161091192919061142c565b60405180910390a2565b60035481565b600260169054906101000a900460ff1681565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109ba576040517fccb665a600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610a00576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8015610aec57610a545f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610adf92919061142c565b60405180910390a2610bd2565b610b3c60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610bc992919061142c565b60405180910390a25b3373ffffffffffffffffffffffffffffffffffffffff167fcea2bc33eef9c2bacf266c2b7b17f8f2db3c22582cb56c00467843e85d98021e82604051610c189190611279565b60405180910390a250565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b60045f9054906101000a900460ff1615610c92576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b835f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508042610d5d9190611480565b600381905550600160045f6101000a81548160ff021916908315150217905550610dce3330600554600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166110c3909392919063ffffffff16565b50505050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e5a576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610ea0576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f549a6c85fc7bef88326ec18b7449fc97c5bedfb5d649dbc056c88b579d1c34c760405160405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610fa6576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff1615610fed576040517faa0090ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f695fbf2fe28b4fde5705122279ffc4160ebfc0f45e4d96f7e6699001be5062ef60405160405180910390a2565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6110be83828473ffffffffffffffffffffffffffffffffffffffff166111459092919063ffffffff16565b505050565b61113f848573ffffffffffffffffffffffffffffffffffffffff166323b872dd8686866040516024016110f8939291906114b3565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506111c4565b50505050565b6111bf838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb858560405160240161117892919061142c565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506111c4565b505050565b5f8060205f8451602086015f885af1806111e3576040513d5f823e3d81fd5b3d92505f519150505f82146111fc576001811415611217565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b1561125957836040517f5274afe700000000000000000000000000000000000000000000000000000000815260040161125091906112d1565b60405180910390fd5b50505050565b5f8115159050919050565b6112738161125f565b82525050565b5f60208201905061128c5f83018461126a565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6112bb82611292565b9050919050565b6112cb816112b1565b82525050565b5f6020820190506112e45f8301846112c2565b92915050565b5f819050919050565b6112fc816112ea565b82525050565b5f6020820190506113155f8301846112f3565b92915050565b5f80fd5b6113288161125f565b8114611332575f80fd5b50565b5f813590506113438161131f565b92915050565b5f6020828403121561135e5761135d61131b565b5b5f61136b84828501611335565b91505092915050565b61137d816112b1565b8114611387575f80fd5b50565b5f8135905061139881611374565b92915050565b6113a7816112ea565b81146113b1575f80fd5b50565b5f813590506113c28161139e565b92915050565b5f805f80608085870312156113e0576113df61131b565b5b5f6113ed8782880161138a565b94505060206113fe8782880161138a565b935050604061140f8782880161138a565b9250506060611420878288016113b4565b91505092959194509250565b5f60408201905061143f5f8301856112c2565b61144c60208301846112f3565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61148a826112ea565b9150611495836112ea565b92508282019050808211156114ad576114ac611453565b5b92915050565b5f6060820190506114c65f8301866112c2565b6114d360208301856112c2565b6114e060408301846112f3565b94935050505056fea2646970667358221220b3929dee342577998fb6dd349dd7f22999e6159d878e5636723ea05ab069a43a64736f6c63430008190033",
    "sourceMap": "495:4018:26:-:0;;;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080604052600436106100f6575f3560e01c8063779cd08311610089578063cf756fdf11610058578063cf756fdf146102cf578063edc97a75146102f7578063f240f7c31461030d578063fe25e00a14610323576100fd565b8063779cd0831461022957806389e1e82a14610253578063ae90b2131461027b578063c35905c6146102a5576100fd565b80633013ce29116100c55780633013ce29146101955780633270bb5b146101bf578063590e1ae3146101e957806366101b64146101ff576100fd565b80630335729e1461010157806311da60b41461012b578063123119cd146101415780632806347c1461016b576100fd565b366100fd57005b5f80fd5b34801561010c575f80fd5b5061011561034d565b6040516101229190611279565b60405180910390f35b348015610136575f80fd5b5061013f610360565b005b34801561014c575f80fd5b506101556106cb565b60405161016291906112d1565b60405180910390f35b348015610176575f80fd5b5061017f6106f0565b60405161018c91906112d1565b60405180910390f35b3480156101a0575f80fd5b506101a9610715565b6040516101b691906112d1565b60405180910390f35b3480156101ca575f80fd5b506101d361073b565b6040516101e09190611279565b60405180910390f35b3480156101f4575f80fd5b506101fd61074e565b005b34801561020a575f80fd5b5061021361091b565b6040516102209190611302565b60405180910390f35b348015610234575f80fd5b5061023d610921565b60405161024a9190611279565b60405180910390f35b34801561025e575f80fd5b5061027960048036038101906102749190611349565b610934565b005b348015610286575f80fd5b5061028f610c23565b60405161029c91906112d1565b60405180910390f35b3480156102b0575f80fd5b506102b9610c46565b6040516102c69190611302565b60405180910390f35b3480156102da575f80fd5b506102f560048036038101906102f091906113c8565b610c4c565b005b348015610302575f80fd5b5061030b610dd4565b005b348015610318575f80fd5b50610321610f20565b005b34801561032e575f80fd5b5061033761106e565b60405161034491906112d1565b60405180910390f35b600260149054906101000a900460ff1681565b600260149054906101000a900460ff16156103a7576040517f24dc589a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff16156103ee576040517fcc3a81a700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415801561049657505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156104cd576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610541576001600260156101000a81548160ff0219169083151502179055506105e8565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036105e757600260159054906101000a900460ff16806105b057506003544210155b6105e6576040517fc764a84f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b6106365f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546040516106c192919061142c565b60405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260159054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107d2576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260169054906101000a900460ff1615610819576040517f9c4cec8b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61086960015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b6001600260166101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660055460405161091192919061142c565b60405180910390a2565b60035481565b600260169054906101000a900460ff1681565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109ba576040517fccb665a600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610a00576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8015610aec57610a545f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610adf92919061142c565b60405180910390a2610bd2565b610b3c60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554611093565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610bc992919061142c565b60405180910390a25b3373ffffffffffffffffffffffffffffffffffffffff167fcea2bc33eef9c2bacf266c2b7b17f8f2db3c22582cb56c00467843e85d98021e82604051610c189190611279565b60405180910390a250565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b60045f9054906101000a900460ff1615610c92576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b835f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508042610d5d9190611480565b600381905550600160045f6101000a81548160ff021916908315150217905550610dce3330600554600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166110c3909392919063ffffffff16565b50505050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e5a576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610ea0576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f549a6c85fc7bef88326ec18b7449fc97c5bedfb5d649dbc056c88b579d1c34c760405160405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610fa6576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff1615610fed576040517faa0090ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f695fbf2fe28b4fde5705122279ffc4160ebfc0f45e4d96f7e6699001be5062ef60405160405180910390a2565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6110be83828473ffffffffffffffffffffffffffffffffffffffff166111459092919063ffffffff16565b505050565b61113f848573ffffffffffffffffffffffffffffffffffffffff166323b872dd8686866040516024016110f8939291906114b3565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506111c4565b50505050565b6111bf838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb858560405160240161117892919061142c565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506111c4565b505050565b5f8060205f8451602086015f885af1806111e3576040513d5f823e3d81fd5b3d92505f519150505f82146111fc576001811415611217565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b1561125957836040517f5274afe700000000000000000000000000000000000000000000000000000000815260040161125091906112d1565b60405180910390fd5b50505050565b5f8115159050919050565b6112738161125f565b82525050565b5f60208201905061128c5f83018461126a565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6112bb82611292565b9050919050565b6112cb816112b1565b82525050565b5f6020820190506112e45f8301846112c2565b92915050565b5f819050919050565b6112fc816112ea565b82525050565b5f6020820190506113155f8301846112f3565b92915050565b5f80fd5b6113288161125f565b8114611332575f80fd5b50565b5f813590506113438161131f565b92915050565b5f6020828403121561135e5761135d61131b565b5b5f61136b84828501611335565b91505092915050565b61137d816112b1565b8114611387575f80fd5b50565b5f8135905061139881611374565b92915050565b6113a7816112ea565b81146113b1575f80fd5b50565b5f813590506113c28161139e565b92915050565b5f805f80608085870312156113e0576113df61131b565b5b5f6113ed8782880161138a565b94505060206113fe8782880161138a565b935050604061140f8782880161138a565b9250506060611420878288016113b4565b91505092959194509250565b5f60408201905061143f5f8301856112c2565b61144c60208301846112f3565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61148a826112ea565b9150611495836112ea565b92508282019050808211156114ad576114ac611453565b5b92915050565b5f6060820190506114c65f8301866112c2565b6114d360208301856112c2565b6114e060408301846112f3565b94935050505056fea2646970667358221220b3929dee342577998fb6dd349dd7f22999e6159d878e5636723ea05ab069a43a64736f6c63430008190033",
    "sourceMap": "495:4018:26:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;635:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2412:770;;;;;;;;;;;;;:::i;:::-;;581:20;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;846:30;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;779:27;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;663:21;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3188:273;;;;;;;;;;;;;:::i;:::-;;718:25;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;690:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3863:510;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;555:20;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;812:28;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1785:586;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;3659:186;;;;;;;;;;;;;:::i;:::-;;3467;;;;;;;;;;;;;:::i;:::-;;607:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;635;;;;;;;;;;;;;:::o;2412:770::-;2453:10;;;;;;;;;;;2449:65;;;2486:17;;;;;;;;;;;;;;2449:65;2527:9;;;;;;;;;;;2523:70;;;2559:23;;;;;;;;;;;;;;2523:70;2620:5;;;;;;;;;;;2606:19;;:10;:19;;;;:42;;;;;2643:5;;;;;;;;;;2629:19;;:10;:19;;;;2606:42;2602:95;;;2671:15;;;;;;;;;;;;;;2602:95;2733:5;;;;;;;;;;;2719:19;;:10;:19;;;2715:340;;2766:4;2754:9;;:16;;;;;;;;;;;;;;;;;;2715:340;;;2805:5;;;;;;;;;;2791:19;;:10;:19;;;2787:268;;2832:9;;;;;;;;;;;:42;;;;2864:10;;2845:15;:29;;2832:42;2826:219;;2933:17;;;;;;;;;;;;;;2826:219;2787:268;2715:340;3065:52;3082:5;;;;;;;;;;3089:12;;;;;;;;;;;3103:13;;3065:16;:52::i;:::-;3140:5;;;;;;;;;;3132:43;;;3147:12;;;;;;;;;;;3161:13;;3132:43;;;;;;;:::i;:::-;;;;;;;;2412:770::o;581:20::-;;;;;;;;;;;;;:::o;846:30::-;;;;;;;;;;;;;:::o;779:27::-;;;;;;;;;;;;;:::o;663:21::-;;;;;;;;;;;;;:::o;3188:273::-;1545:5;;;;;;;;;;1531:19;;:10;:19;;;1527:73;;1573:15;;;;;;;;;;;;;;1527:73;3239:10:::1;;;;;;;;;;;3235:72;;;3272:24;;;;;;;;;;;;;;3235:72;3316:52;3333:5;;;;;;;;;;;3340:12;;;;;;;;;;;3354:13;;3316:16;:52::i;:::-;3391:4;3378:10;;:17;;;;;;;;;;;;;;;;;;3419:5;;;;;;;;;;;3410:44;;;3426:12;;;;;;;;;;;3440:13;;3410:44;;;;;;;:::i;:::-;;;;;;;;3188:273::o:0;718:25::-;;;;:::o;690:22::-;;;;;;;;;;;;;:::o;3863:510::-;1299:7;;;;;;;;;;;1285:21;;:10;:21;;;1281:71;;1329:12;;;;;;;;;;;;;;1281:71;3942:10:::1;;;;;;;;;;;3937:62;;3975:13;;;;;;;;;;;;;;3937:62;4012:12;4008:303;;;4040:52;4057:5;::::0;::::1;;;;;;;;4064:12;;;;;;;;;;;4078:13;;4040:16;:52::i;:::-;4119:5;::::0;::::1;;;;;;;;4111:43;;;4126:12;;;;;;;;;;;4140:13;;4111:43;;;;;;;:::i;:::-;;;;;;;;4008:303;;;4185:52;4202:5;;;;;;;;;;;4209:12;;;;;;;;;;;4223:13;;4185:16;:52::i;:::-;4265:5;;;;;;;;;;;4256:44;;;4272:12;;;;;;;;;;;4286:13;;4256:44;;;;;;;:::i;:::-;;;;;;;;4008:303;4341:10;4325:41;;;4353:12;4325:41;;;;;;:::i;:::-;;;;;;;;3863:510:::0;:::o;555:20::-;;;;;;;;;;;;:::o;812:28::-;;;;:::o;1785:586::-;1902:11;;;;;;;;;;;1898:69;;;1936:20;;;;;;;;;;;;;;1898:69;1984:6;1976:5;;:14;;;;;;;;;;;;;;;;;;2010:8;2000:7;;:18;;;;;;;;;;;;;;;;;;2036:6;2028:5;;:14;;;;;;;;;;;;;;;;;;2083;2065:15;:32;;;;:::i;:::-;2052:10;:45;;;;2205:4;2191:11;;:18;;;;;;;;;;;;;;;;;;2285:79;2323:10;2343:4;2350:13;;2292:12;;;;;;;;;;;2285:37;;;;:79;;;;;;:::i;:::-;1785:586;;;;:::o;3659:186::-;1424:5;;;;;;;;;;;1410:19;;:10;:19;;;1406:67;;1452:10;;;;;;;;;;;;;;1406:67;3718:10:::1;;;;;;;;;;;3713:62;;3751:13;;;;;;;;;;;;;;3713:62;3797:5;3784:10;;:18;;;;;;;;;;;;;;;;;;3832:5;;;;;;;;;;;3817:21;;;;;;;;;;;;3659:186::o:0;3467:::-;1424:5;;;;;;;;;;;1410:19;;:10;:19;;;1406:67;;1452:10;;;;;;;;;;;;;;1406:67;3519:9:::1;;;;;;;;;;;3515:75;;;3551:28;;;;;;;;;;;;;;3515:75;3612:4;3599:10;;:17;;;;;;;;;;;;;;;;;;3640:5;;;;;;;;;;;3631:15;;;;;;;;;;;;3467:186::o:0;607:22::-;;;;;;;;;;;;;:::o;4379:132::-;4466:38;4493:2;4497:6;4473:5;4466:26;;;;:38;;;;;:::i;:::-;4379:132;;;:::o;1618:188:20:-;1718:81;1738:5;1760;:18;;;1781:4;1787:2;1791:5;1745:53;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1718:19;:81::i;:::-;1618:188;;;;:::o;1219:160::-;1301:71;1321:5;1343;:14;;;1360:2;1364:5;1328:43;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1301:19;:71::i;:::-;1219:160;;;:::o;8370:720::-;8450:18;8478:19;8616:4;8613:1;8606:4;8600:11;8593:4;8587;8583:15;8580:1;8573:5;8566;8561:60;8673:7;8663:176;;8717:4;8711:11;8762:16;8759:1;8754:3;8739:40;8808:16;8803:3;8796:29;8663:176;8866:16;8852:30;;8916:1;8910:8;8895:23;;8532:396;8956:1;8942:10;:15;:68;;9009:1;8994:11;:16;;8942:68;;;8990:1;8968:5;8960:26;;;:31;8942:68;8938:146;;;9066:5;9033:40;;;;;;;;;;;:::i;:::-;;;;;;;;8938:146;8440:650;;8370:720;;:::o;7:90:27:-;41:7;84:5;77:13;70:21;59:32;;7:90;;;:::o;103:109::-;184:21;199:5;184:21;:::i;:::-;179:3;172:34;103:109;;:::o;218:210::-;305:4;343:2;332:9;328:18;320:26;;356:65;418:1;407:9;403:17;394:6;356:65;:::i;:::-;218:210;;;;:::o;434:126::-;471:7;511:42;504:5;500:54;489:65;;434:126;;;:::o;566:96::-;603:7;632:24;650:5;632:24;:::i;:::-;621:35;;566:96;;;:::o;668:118::-;755:24;773:5;755:24;:::i;:::-;750:3;743:37;668:118;;:::o;792:222::-;885:4;923:2;912:9;908:18;900:26;;936:71;1004:1;993:9;989:17;980:6;936:71;:::i;:::-;792:222;;;;:::o;1020:77::-;1057:7;1086:5;1075:16;;1020:77;;;:::o;1103:118::-;1190:24;1208:5;1190:24;:::i;:::-;1185:3;1178:37;1103:118;;:::o;1227:222::-;1320:4;1358:2;1347:9;1343:18;1335:26;;1371:71;1439:1;1428:9;1424:17;1415:6;1371:71;:::i;:::-;1227:222;;;;:::o;1536:117::-;1645:1;1642;1635:12;1782:116;1852:21;1867:5;1852:21;:::i;:::-;1845:5;1842:32;1832:60;;1888:1;1885;1878:12;1832:60;1782:116;:::o;1904:133::-;1947:5;1985:6;1972:20;1963:29;;2001:30;2025:5;2001:30;:::i;:::-;1904:133;;;;:::o;2043:323::-;2099:6;2148:2;2136:9;2127:7;2123:23;2119:32;2116:119;;;2154:79;;:::i;:::-;2116:119;2274:1;2299:50;2341:7;2332:6;2321:9;2317:22;2299:50;:::i;:::-;2289:60;;2245:114;2043:323;;;;:::o;2372:122::-;2445:24;2463:5;2445:24;:::i;:::-;2438:5;2435:35;2425:63;;2484:1;2481;2474:12;2425:63;2372:122;:::o;2500:139::-;2546:5;2584:6;2571:20;2562:29;;2600:33;2627:5;2600:33;:::i;:::-;2500:139;;;;:::o;2645:122::-;2718:24;2736:5;2718:24;:::i;:::-;2711:5;2708:35;2698:63;;2757:1;2754;2747:12;2698:63;2645:122;:::o;2773:139::-;2819:5;2857:6;2844:20;2835:29;;2873:33;2900:5;2873:33;:::i;:::-;2773:139;;;;:::o;2918:765::-;3004:6;3012;3020;3028;3077:3;3065:9;3056:7;3052:23;3048:33;3045:120;;;3084:79;;:::i;:::-;3045:120;3204:1;3229:53;3274:7;3265:6;3254:9;3250:22;3229:53;:::i;:::-;3219:63;;3175:117;3331:2;3357:53;3402:7;3393:6;3382:9;3378:22;3357:53;:::i;:::-;3347:63;;3302:118;3459:2;3485:53;3530:7;3521:6;3510:9;3506:22;3485:53;:::i;:::-;3475:63;;3430:118;3587:2;3613:53;3658:7;3649:6;3638:9;3634:22;3613:53;:::i;:::-;3603:63;;3558:118;2918:765;;;;;;;:::o;3689:332::-;3810:4;3848:2;3837:9;3833:18;3825:26;;3861:71;3929:1;3918:9;3914:17;3905:6;3861:71;:::i;:::-;3942:72;4010:2;3999:9;3995:18;3986:6;3942:72;:::i;:::-;3689:332;;;;;:::o;4027:180::-;4075:77;4072:1;4065:88;4172:4;4169:1;4162:15;4196:4;4193:1;4186:15;4213:191;4253:3;4272:20;4290:1;4272:20;:::i;:::-;4267:25;;4306:20;4324:1;4306:20;:::i;:::-;4301:25;;4349:1;4346;4342:9;4335:16;;4370:3;4367:1;4364:10;4361:36;;;4377:18;;:::i;:::-;4361:36;4213:191;;;;:::o;4410:442::-;4559:4;4597:2;4586:9;4582:18;4574:26;;4610:71;4678:1;4667:9;4663:17;4654:6;4610:71;:::i;:::-;4691:72;4759:2;4748:9;4744:18;4735:6;4691:72;:::i;:::-;4773;4841:2;4830:9;4826:18;4817:6;4773:72;:::i;:::-;4410:442;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "arbiter()": "fe25e00a",
    "dispute()": "f240f7c3",
    "initialize(address,address,address,uint256)": "cf756fdf",
    "isDisputed()": "0335729e",
    "isRefunded()": "779cd083",
    "isSettled()": "3270bb5b",
    "payee()": "ae90b213",
    "payer()": "123119cd",
    "paymentAmount()": "c35905c6",
    "paymentToken()": "3013ce29",
    "proposedArbiter()": "2806347c",
    "refund()": "590e1ae3",
    "removeDispute()": "edc97a75",
    "resolveDispute(bool)": "89e1e82a",
    "settle()": "11da60b4",
    "settleTime()": "66101b64"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.25+commit.b61c2a91\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"AlreadyInitialized\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CannotDisputeSettledEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CannotSettleYet\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotArbiter\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotAuthorized\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotDisputed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayer\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PaymentAlreadyRefunded\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PaymentAlreadySettled\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PaymentDisputed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"SafeERC20FailedOperation\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"disputeRemover\",\"type\":\"address\"}],\"name\":\"DisputeRemoved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"resolver\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"settled\",\"type\":\"bool\"}],\"name\":\"DisputeResolved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"disputeInitiator\",\"type\":\"address\"}],\"name\":\"Disputed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"}],\"name\":\"PayerSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Refunded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Settled\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"arbiter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"dispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_payee\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_arbiter\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"settleDeadline\",\"type\":\"uint256\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isDisputed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isRefunded\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isSettled\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"payee\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"payer\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"paymentAmount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"paymentToken\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proposedArbiter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"refund\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"removeDispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"shouldSettle\",\"type\":\"bool\"}],\"name\":\"resolveDispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"settle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"settleTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"SafeERC20FailedOperation(address)\":[{\"details\":\"An operation with an ERC-20 token failed.\"}]},\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/SimpleEscrow.sol\":\"SimpleEscrow\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"]},\"sources\":{\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0x9b6b3e7803bc5f2f8cd7ad57db8ac1def61a9930a5a3107df4882e028a9605d7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da62d6be1f5c6edf577f0cb45666a8aa9c2086a4bac87d95d65f02e2f4c36a4b\",\"dweb:/ipfs/QmNkpvBpoCMvX8JwAFNSc5XxJ2q5BXJpL5L1txb4QkqVFF\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0xde7e9fd9aee8d4f40772f96bb3b58836cbc6dfc0227014a061947f8821ea9724\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://11fea9f8bc98949ac6709f0c1699db7430d2948137aa94d5a9e95a91f61a710a\",\"dweb:/ipfs/QmQdfRXxQjwP6yn3DVo1GHPpriKNcFghSPi94Z1oKEFUNS\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0xce41876e78d1badc0512229b4d14e4daf83bc1003d7f83978d18e0e56f965b9c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a2608291cb038b388d80b79a06b6118a42f7894ff67b7da10ec0dbbf5b2973ba\",\"dweb:/ipfs/QmWohqcBLbcxmA4eGPhZDXe5RYMMEEpFq22nfkaUMvTfw1\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xe06a3f08a987af6ad2e1c1e774405d4fe08f1694b67517438b467cecf0da0ef7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://df6f0c459663c9858b6cba2cda1d14a7d05a985bed6d2de72bd8e78c25ee79db\",\"dweb:/ipfs/QmeTTxZ7qVk9rjEv2R4CpCwdf8UMCcRqDNMvzNxHc3Fnn9\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x982c5cb790ab941d1e04f807120a71709d4c313ba0bfc16006447ffbd27fbbd5\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8150ceb4ac947e8a442b2a9c017e01e880b2be2dd958f1fa9bc405f4c5a86508\",\"dweb:/ipfs/QmbcBmFX66AY6Kbhnd5gx7zpkgqnUafo43XnmayAM7zVdB\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x79796192ec90263f21b464d5bc90b777a525971d3de8232be80d9c4f9fb353b8\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://f6fda447a62815e8064f47eff0dd1cf58d9207ad69b5d32280f8d7ed1d1e4621\",\"dweb:/ipfs/QmfDRc7pxfaXB2Dh9np5Uf29Na3pQ7tafRS684wd3GLjVL\"]},\"src/SimpleEscrow.sol\":{\"keccak256\":\"0x9f5f22293016b8cdffc83904dcf3fecbbcaf84f90faa8fb100adeed4fa614f58\",\"license\":\"GPL-3.0\",\"urls\":[\"bzz-raw://162b4293e9891b3224c4c2d5f3c423a14351ba04793af407de63862f12b6f3df\",\"dweb:/ipfs/QmaZfQEmrzR6xEJMuee84qJ8c1W7FJTY873bmhEeYWJNiE\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.25+commit.b61c2a91"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [],
          "type": "error",
          "name": "AlreadyInitialized"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "CannotDisputeSettledEscrow"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "CannotSettleYet"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotArbiter"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotAuthorized"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotDisputed"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "NotPayer"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "PaymentAlreadyRefunded"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "PaymentAlreadySettled"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "PaymentDisputed"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            }
          ],
          "type": "error",
          "name": "SafeERC20FailedOperation"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "disputeRemover",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "DisputeRemoved",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "resolver",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "bool",
              "name": "settled",
              "type": "bool",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "DisputeResolved",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "disputeInitiator",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "Disputed",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "payer",
              "type": "address",
              "indexed": true
            }
          ],
          "type": "event",
          "name": "PayerSet",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address",
              "indexed": false
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "Refunded",
          "anonymous": false
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address",
              "indexed": false
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "Settled",
          "anonymous": false
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "arbiter",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "dispute"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_payee",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_payer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_arbiter",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "settleDeadline",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "initialize"
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "isDisputed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "isRefunded",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "isSettled",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "payee",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "payer",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "paymentAmount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "paymentToken",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "proposedArbiter",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "refund"
        },
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "removeDispute"
        },
        {
          "inputs": [
            {
              "internalType": "bool",
              "name": "shouldSettle",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "resolveDispute"
        },
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "settle"
        },
        {
          "inputs": [],
          "stateMutability": "view",
          "type": "function",
          "name": "settleTime",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ]
        },
        {
          "inputs": [],
          "stateMutability": "payable",
          "type": "receive"
        }
      ],
      "devdoc": {
        "kind": "dev",
        "methods": {},
        "version": 1
      },
      "userdoc": {
        "kind": "user",
        "methods": {},
        "version": 1
      }
    },
    "settings": {
      "remappings": [
        "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
        "erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/",
        "forge-std/=lib/forge-std/src/",
        "halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/",
        "openzeppelin-contracts/=lib/openzeppelin-contracts/"
      ],
      "optimizer": {
        "enabled": false,
        "runs": 200
      },
      "metadata": {
        "bytecodeHash": "ipfs"
      },
      "compilationTarget": {
        "src/SimpleEscrow.sol": "SimpleEscrow"
      },
      "evmVersion": "cancun",
      "libraries": {}
    },
    "sources": {
      "lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol": {
        "keccak256": "0x9b6b3e7803bc5f2f8cd7ad57db8ac1def61a9930a5a3107df4882e028a9605d7",
        "urls": [
          "bzz-raw://da62d6be1f5c6edf577f0cb45666a8aa9c2086a4bac87d95d65f02e2f4c36a4b",
          "dweb:/ipfs/QmNkpvBpoCMvX8JwAFNSc5XxJ2q5BXJpL5L1txb4QkqVFF"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol": {
        "keccak256": "0xde7e9fd9aee8d4f40772f96bb3b58836cbc6dfc0227014a061947f8821ea9724",
        "urls": [
          "bzz-raw://11fea9f8bc98949ac6709f0c1699db7430d2948137aa94d5a9e95a91f61a710a",
          "dweb:/ipfs/QmQdfRXxQjwP6yn3DVo1GHPpriKNcFghSPi94Z1oKEFUNS"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol": {
        "keccak256": "0xce41876e78d1badc0512229b4d14e4daf83bc1003d7f83978d18e0e56f965b9c",
        "urls": [
          "bzz-raw://a2608291cb038b388d80b79a06b6118a42f7894ff67b7da10ec0dbbf5b2973ba",
          "dweb:/ipfs/QmWohqcBLbcxmA4eGPhZDXe5RYMMEEpFq22nfkaUMvTfw1"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol": {
        "keccak256": "0xe06a3f08a987af6ad2e1c1e774405d4fe08f1694b67517438b467cecf0da0ef7",
        "urls": [
          "bzz-raw://df6f0c459663c9858b6cba2cda1d14a7d05a985bed6d2de72bd8e78c25ee79db",
          "dweb:/ipfs/QmeTTxZ7qVk9rjEv2R4CpCwdf8UMCcRqDNMvzNxHc3Fnn9"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol": {
        "keccak256": "0x982c5cb790ab941d1e04f807120a71709d4c313ba0bfc16006447ffbd27fbbd5",
        "urls": [
          "bzz-raw://8150ceb4ac947e8a442b2a9c017e01e880b2be2dd958f1fa9bc405f4c5a86508",
          "dweb:/ipfs/QmbcBmFX66AY6Kbhnd5gx7zpkgqnUafo43XnmayAM7zVdB"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol": {
        "keccak256": "0x79796192ec90263f21b464d5bc90b777a525971d3de8232be80d9c4f9fb353b8",
        "urls": [
          "bzz-raw://f6fda447a62815e8064f47eff0dd1cf58d9207ad69b5d32280f8d7ed1d1e4621",
          "dweb:/ipfs/QmfDRc7pxfaXB2Dh9np5Uf29Na3pQ7tafRS684wd3GLjVL"
        ],
        "license": "MIT"
      },
      "src/SimpleEscrow.sol": {
        "keccak256": "0x9f5f22293016b8cdffc83904dcf3fecbbcaf84f90faa8fb100adeed4fa614f58",
        "urls": [
          "bzz-raw://162b4293e9891b3224c4c2d5f3c423a14351ba04793af407de63862f12b6f3df",
          "dweb:/ipfs/QmaZfQEmrzR6xEJMuee84qJ8c1W7FJTY873bmhEeYWJNiE"
        ],
        "license": "GPL-3.0"
      }
    },
    "version": 1
  },
  "id": 26
} as const;
    export default SimpleEscrow
  
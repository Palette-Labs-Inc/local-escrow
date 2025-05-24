
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
        },
        {
          "name": "_paymentToken",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_paymentAmount",
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
    "object": "0x6080604052348015600e575f80fd5b5061158d8061001c5f395ff3fe6080604052600436106100f6575f3560e01c806373c3113411610089578063c35905c611610058578063c35905c6146102cd578063edc97a75146102f7578063f240f7c31461030d578063fe25e00a14610323576100fd565b806373c3113414610229578063779cd0831461025157806389e1e82a1461027b578063ae90b213146102a3576100fd565b80633013ce29116100c55780633013ce29146101955780633270bb5b146101bf578063590e1ae3146101e957806366101b64146101ff576100fd565b80630335729e1461010157806311da60b41461012b578063123119cd146101415780632806347c1461016b576100fd565b366100fd57005b5f80fd5b34801561010c575f80fd5b5061011561034d565b60405161012291906112c3565b60405180910390f35b348015610136575f80fd5b5061013f610360565b005b34801561014c575f80fd5b506101556106cb565b604051610162919061131b565b60405180910390f35b348015610176575f80fd5b5061017f6106f0565b60405161018c919061131b565b60405180910390f35b3480156101a0575f80fd5b506101a9610715565b6040516101b6919061131b565b60405180910390f35b3480156101ca575f80fd5b506101d361073b565b6040516101e091906112c3565b60405180910390f35b3480156101f4575f80fd5b506101fd61074e565b005b34801561020a575f80fd5b5061021361091b565b604051610220919061134c565b60405180910390f35b348015610234575f80fd5b5061024f600480360381019061024a91906113bd565b610921565b005b34801561025c575f80fd5b50610265610af3565b60405161027291906112c3565b60405180910390f35b348015610286575f80fd5b506102a1600480360381019061029c9190611470565b610b06565b005b3480156102ae575f80fd5b506102b7610df5565b6040516102c4919061131b565b60405180910390f35b3480156102d8575f80fd5b506102e1610e18565b6040516102ee919061134c565b60405180910390f35b348015610302575f80fd5b5061030b610e1e565b005b348015610318575f80fd5b50610321610f6a565b005b34801561032e575f80fd5b506103376110b8565b604051610344919061131b565b60405180910390f35b600260149054906101000a900460ff1681565b600260149054906101000a900460ff16156103a7576040517f24dc589a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff16156103ee576040517fcc3a81a700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415801561049657505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156104cd576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610541576001600260156101000a81548160ff0219169083151502179055506105e8565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036105e757600260159054906101000a900460ff16806105b057506003544210155b6105e6576040517fc764a84f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b6106365f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546040516106c192919061149b565b60405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260159054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107d2576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260169054906101000a900460ff1615610819576040517f9c4cec8b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61086960015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b6001600260166101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660055460405161091192919061149b565b60405180910390a2565b60035481565b60045f9054906101000a900460ff1615610967576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b855f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508460015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508242610a3291906114ef565b60038190555081600460016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600581905550600160045f6101000a81548160ff021916908315150217905550610aeb3330600554600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661110d909392919063ffffffff16565b505050505050565b600260169054906101000a900460ff1681565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b8c576040517fccb665a600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610bd2576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8015610cbe57610c265f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610cb192919061149b565b60405180910390a2610da4565b610d0e60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610d9b92919061149b565b60405180910390a25b3373ffffffffffffffffffffffffffffffffffffffff167fcea2bc33eef9c2bacf266c2b7b17f8f2db3c22582cb56c00467843e85d98021e82604051610dea91906112c3565b60405180910390a250565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ea4576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610eea576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f549a6c85fc7bef88326ec18b7449fc97c5bedfb5d649dbc056c88b579d1c34c760405160405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ff0576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff1615611037576040517faa0090ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f695fbf2fe28b4fde5705122279ffc4160ebfc0f45e4d96f7e6699001be5062ef60405160405180910390a2565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61110883828473ffffffffffffffffffffffffffffffffffffffff1661118f9092919063ffffffff16565b505050565b611189848573ffffffffffffffffffffffffffffffffffffffff166323b872dd86868660405160240161114293929190611522565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061120e565b50505050565b611209838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040516024016111c292919061149b565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061120e565b505050565b5f8060205f8451602086015f885af18061122d576040513d5f823e3d81fd5b3d92505f519150505f8214611246576001811415611261565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b156112a357836040517f5274afe700000000000000000000000000000000000000000000000000000000815260040161129a919061131b565b60405180910390fd5b50505050565b5f8115159050919050565b6112bd816112a9565b82525050565b5f6020820190506112d65f8301846112b4565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f611305826112dc565b9050919050565b611315816112fb565b82525050565b5f60208201905061132e5f83018461130c565b92915050565b5f819050919050565b61134681611334565b82525050565b5f60208201905061135f5f83018461133d565b92915050565b5f80fd5b611372816112fb565b811461137c575f80fd5b50565b5f8135905061138d81611369565b92915050565b61139c81611334565b81146113a6575f80fd5b50565b5f813590506113b781611393565b92915050565b5f805f805f8060c087890312156113d7576113d6611365565b5b5f6113e489828a0161137f565b96505060206113f589828a0161137f565b955050604061140689828a0161137f565b945050606061141789828a016113a9565b935050608061142889828a0161137f565b92505060a061143989828a016113a9565b9150509295509295509295565b61144f816112a9565b8114611459575f80fd5b50565b5f8135905061146a81611446565b92915050565b5f6020828403121561148557611484611365565b5b5f6114928482850161145c565b91505092915050565b5f6040820190506114ae5f83018561130c565b6114bb602083018461133d565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6114f982611334565b915061150483611334565b925082820190508082111561151c5761151b6114c2565b5b92915050565b5f6060820190506115355f83018661130c565b611542602083018561130c565b61154f604083018461133d565b94935050505056fea2646970667358221220c5b10b7e492e5ee47f7a4784ffdec19758ab450acb942387c427a6553e70522464736f6c63430008190033",
    "sourceMap": "495:3900:26:-:0;;;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080604052600436106100f6575f3560e01c806373c3113411610089578063c35905c611610058578063c35905c6146102cd578063edc97a75146102f7578063f240f7c31461030d578063fe25e00a14610323576100fd565b806373c3113414610229578063779cd0831461025157806389e1e82a1461027b578063ae90b213146102a3576100fd565b80633013ce29116100c55780633013ce29146101955780633270bb5b146101bf578063590e1ae3146101e957806366101b64146101ff576100fd565b80630335729e1461010157806311da60b41461012b578063123119cd146101415780632806347c1461016b576100fd565b366100fd57005b5f80fd5b34801561010c575f80fd5b5061011561034d565b60405161012291906112c3565b60405180910390f35b348015610136575f80fd5b5061013f610360565b005b34801561014c575f80fd5b506101556106cb565b604051610162919061131b565b60405180910390f35b348015610176575f80fd5b5061017f6106f0565b60405161018c919061131b565b60405180910390f35b3480156101a0575f80fd5b506101a9610715565b6040516101b6919061131b565b60405180910390f35b3480156101ca575f80fd5b506101d361073b565b6040516101e091906112c3565b60405180910390f35b3480156101f4575f80fd5b506101fd61074e565b005b34801561020a575f80fd5b5061021361091b565b604051610220919061134c565b60405180910390f35b348015610234575f80fd5b5061024f600480360381019061024a91906113bd565b610921565b005b34801561025c575f80fd5b50610265610af3565b60405161027291906112c3565b60405180910390f35b348015610286575f80fd5b506102a1600480360381019061029c9190611470565b610b06565b005b3480156102ae575f80fd5b506102b7610df5565b6040516102c4919061131b565b60405180910390f35b3480156102d8575f80fd5b506102e1610e18565b6040516102ee919061134c565b60405180910390f35b348015610302575f80fd5b5061030b610e1e565b005b348015610318575f80fd5b50610321610f6a565b005b34801561032e575f80fd5b506103376110b8565b604051610344919061131b565b60405180910390f35b600260149054906101000a900460ff1681565b600260149054906101000a900460ff16156103a7576040517f24dc589a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff16156103ee576040517fcc3a81a700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415801561049657505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b156104cd576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610541576001600260156101000a81548160ff0219169083151502179055506105e8565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036105e757600260159054906101000a900460ff16806105b057506003544210155b6105e6576040517fc764a84f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b6106365f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546040516106c192919061149b565b60405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260159054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107d2576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260169054906101000a900460ff1615610819576040517f9c4cec8b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61086960015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b6001600260166101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660055460405161091192919061149b565b60405180910390a2565b60035481565b60045f9054906101000a900460ff1615610967576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b855f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508460015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508242610a3291906114ef565b60038190555081600460016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600581905550600160045f6101000a81548160ff021916908315150217905550610aeb3330600554600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661110d909392919063ffffffff16565b505050505050565b600260169054906101000a900460ff1681565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b8c576040517fccb665a600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610bd2576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8015610cbe57610c265f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a68600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610cb192919061149b565b60405180910390a2610da4565b610d0e60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166005546110dd565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600554604051610d9b92919061149b565b60405180910390a25b3373ffffffffffffffffffffffffffffffffffffffff167fcea2bc33eef9c2bacf266c2b7b17f8f2db3c22582cb56c00467843e85d98021e82604051610dea91906112c3565b60405180910390a250565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ea4576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610eea576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f549a6c85fc7bef88326ec18b7449fc97c5bedfb5d649dbc056c88b579d1c34c760405160405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ff0576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff1615611037576040517faa0090ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f695fbf2fe28b4fde5705122279ffc4160ebfc0f45e4d96f7e6699001be5062ef60405160405180910390a2565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61110883828473ffffffffffffffffffffffffffffffffffffffff1661118f9092919063ffffffff16565b505050565b611189848573ffffffffffffffffffffffffffffffffffffffff166323b872dd86868660405160240161114293929190611522565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061120e565b50505050565b611209838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040516024016111c292919061149b565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061120e565b505050565b5f8060205f8451602086015f885af18061122d576040513d5f823e3d81fd5b3d92505f519150505f8214611246576001811415611261565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b156112a357836040517f5274afe700000000000000000000000000000000000000000000000000000000815260040161129a919061131b565b60405180910390fd5b50505050565b5f8115159050919050565b6112bd816112a9565b82525050565b5f6020820190506112d65f8301846112b4565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f611305826112dc565b9050919050565b611315816112fb565b82525050565b5f60208201905061132e5f83018461130c565b92915050565b5f819050919050565b61134681611334565b82525050565b5f60208201905061135f5f83018461133d565b92915050565b5f80fd5b611372816112fb565b811461137c575f80fd5b50565b5f8135905061138d81611369565b92915050565b61139c81611334565b81146113a6575f80fd5b50565b5f813590506113b781611393565b92915050565b5f805f805f8060c087890312156113d7576113d6611365565b5b5f6113e489828a0161137f565b96505060206113f589828a0161137f565b955050604061140689828a0161137f565b945050606061141789828a016113a9565b935050608061142889828a0161137f565b92505060a061143989828a016113a9565b9150509295509295509295565b61144f816112a9565b8114611459575f80fd5b50565b5f8135905061146a81611446565b92915050565b5f6020828403121561148557611484611365565b5b5f6114928482850161145c565b91505092915050565b5f6040820190506114ae5f83018561130c565b6114bb602083018461133d565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6114f982611334565b915061150483611334565b925082820190508082111561151c5761151b6114c2565b5b92915050565b5f6060820190506115355f83018661130c565b611542602083018561130c565b61154f604083018461133d565b94935050505056fea2646970667358221220c5b10b7e492e5ee47f7a4784ffdec19758ab450acb942387c427a6553e70522464736f6c63430008190033",
    "sourceMap": "495:3900:26:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;635:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2294:770;;;;;;;;;;;;;:::i;:::-;;581:20;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;846:30;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;779:27;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;663:21;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3070:273;;;;;;;;;;;;;:::i;:::-;;718:25;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1626:627;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;690:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3745:510;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;555:20;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;812:28;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3541:186;;;;;;;;;;;;;:::i;:::-;;3349;;;;;;;;;;;;;:::i;:::-;;607:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;635;;;;;;;;;;;;;:::o;2294:770::-;2335:10;;;;;;;;;;;2331:65;;;2368:17;;;;;;;;;;;;;;2331:65;2409:9;;;;;;;;;;;2405:70;;;2441:23;;;;;;;;;;;;;;2405:70;2502:5;;;;;;;;;;;2488:19;;:10;:19;;;;:42;;;;;2525:5;;;;;;;;;;2511:19;;:10;:19;;;;2488:42;2484:95;;;2553:15;;;;;;;;;;;;;;2484:95;2615:5;;;;;;;;;;;2601:19;;:10;:19;;;2597:340;;2648:4;2636:9;;:16;;;;;;;;;;;;;;;;;;2597:340;;;2687:5;;;;;;;;;;2673:19;;:10;:19;;;2669:268;;2714:9;;;;;;;;;;;:42;;;;2746:10;;2727:15;:29;;2714:42;2708:219;;2815:17;;;;;;;;;;;;;;2708:219;2669:268;2597:340;2947:52;2964:5;;;;;;;;;;2971:12;;;;;;;;;;;2985:13;;2947:16;:52::i;:::-;3022:5;;;;;;;;;;3014:43;;;3029:12;;;;;;;;;;;3043:13;;3014:43;;;;;;;:::i;:::-;;;;;;;;2294:770::o;581:20::-;;;;;;;;;;;;;:::o;846:30::-;;;;;;;;;;;;;:::o;779:27::-;;;;;;;;;;;;;:::o;663:21::-;;;;;;;;;;;;;:::o;3070:273::-;1545:5;;;;;;;;;;1531:19;;:10;:19;;;1527:73;;1573:15;;;;;;;;;;;;;;1527:73;3121:10:::1;;;;;;;;;;;3117:72;;;3154:24;;;;;;;;;;;;;;3117:72;3198:52;3215:5;;;;;;;;;;;3222:12;;;;;;;;;;;3236:13;;3198:16;:52::i;:::-;3273:4;3260:10;;:17;;;;;;;;;;;;;;;;;;3301:5;;;;;;;;;;;3292:44;;;3308:12;;;;;;;;;;;3322:13;;3292:44;;;;;;;:::i;:::-;;;;;;;;3070:273::o:0;718:25::-;;;;:::o;1626:627::-;1790:11;;;;;;;;;;;1786:69;;;1824:20;;;;;;;;;;;;;;1786:69;1872:6;1864:5;;:14;;;;;;;;;;;;;;;;;;1898:8;1888:7;;:18;;;;;;;;;;;;;;;;;;1924:6;1916:5;;:14;;;;;;;;;;;;;;;;;;1971;1953:15;:32;;;;:::i;:::-;1940:10;:45;;;;2010:13;1995:12;;:28;;;;;;;;;;;;;;;;;;2049:14;2033:13;:30;;;;2087:4;2073:11;;:18;;;;;;;;;;;;;;;;;;2167:79;2205:10;2225:4;2232:13;;2174:12;;;;;;;;;;;2167:37;;;;:79;;;;;;:::i;:::-;1626:627;;;;;;:::o;690:22::-;;;;;;;;;;;;;:::o;3745:510::-;1299:7;;;;;;;;;;;1285:21;;:10;:21;;;1281:71;;1329:12;;;;;;;;;;;;;;1281:71;3824:10:::1;;;;;;;;;;;3819:62;;3857:13;;;;;;;;;;;;;;3819:62;3894:12;3890:303;;;3922:52;3939:5;::::0;::::1;;;;;;;;3946:12;;;;;;;;;;;3960:13;;3922:16;:52::i;:::-;4001:5;::::0;::::1;;;;;;;;3993:43;;;4008:12;;;;;;;;;;;4022:13;;3993:43;;;;;;;:::i;:::-;;;;;;;;3890:303;;;4067:52;4084:5;;;;;;;;;;;4091:12;;;;;;;;;;;4105:13;;4067:16;:52::i;:::-;4147:5;;;;;;;;;;;4138:44;;;4154:12;;;;;;;;;;;4168:13;;4138:44;;;;;;;:::i;:::-;;;;;;;;3890:303;4223:10;4207:41;;;4235:12;4207:41;;;;;;:::i;:::-;;;;;;;;3745:510:::0;:::o;555:20::-;;;;;;;;;;;;:::o;812:28::-;;;;:::o;3541:186::-;1424:5;;;;;;;;;;;1410:19;;:10;:19;;;1406:67;;1452:10;;;;;;;;;;;;;;1406:67;3600:10:::1;;;;;;;;;;;3595:62;;3633:13;;;;;;;;;;;;;;3595:62;3679:5;3666:10;;:18;;;;;;;;;;;;;;;;;;3714:5;;;;;;;;;;;3699:21;;;;;;;;;;;;3541:186::o:0;3349:::-;1424:5;;;;;;;;;;;1410:19;;:10;:19;;;1406:67;;1452:10;;;;;;;;;;;;;;1406:67;3401:9:::1;;;;;;;;;;;3397:75;;;3433:28;;;;;;;;;;;;;;3397:75;3494:4;3481:10;;:17;;;;;;;;;;;;;;;;;;3522:5;;;;;;;;;;;3513:15;;;;;;;;;;;;3349:186::o:0;607:22::-;;;;;;;;;;;;;:::o;4261:132::-;4348:38;4375:2;4379:6;4355:5;4348:26;;;;:38;;;;;:::i;:::-;4261:132;;;:::o;1618:188:20:-;1718:81;1738:5;1760;:18;;;1781:4;1787:2;1791:5;1745:53;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1718:19;:81::i;:::-;1618:188;;;;:::o;1219:160::-;1301:71;1321:5;1343;:14;;;1360:2;1364:5;1328:43;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1301:19;:71::i;:::-;1219:160;;;:::o;8370:720::-;8450:18;8478:19;8616:4;8613:1;8606:4;8600:11;8593:4;8587;8583:15;8580:1;8573:5;8566;8561:60;8673:7;8663:176;;8717:4;8711:11;8762:16;8759:1;8754:3;8739:40;8808:16;8803:3;8796:29;8663:176;8866:16;8852:30;;8916:1;8910:8;8895:23;;8532:396;8956:1;8942:10;:15;:68;;9009:1;8994:11;:16;;8942:68;;;8990:1;8968:5;8960:26;;;:31;8942:68;8938:146;;;9066:5;9033:40;;;;;;;;;;;:::i;:::-;;;;;;;;8938:146;8440:650;;8370:720;;:::o;7:90:27:-;41:7;84:5;77:13;70:21;59:32;;7:90;;;:::o;103:109::-;184:21;199:5;184:21;:::i;:::-;179:3;172:34;103:109;;:::o;218:210::-;305:4;343:2;332:9;328:18;320:26;;356:65;418:1;407:9;403:17;394:6;356:65;:::i;:::-;218:210;;;;:::o;434:126::-;471:7;511:42;504:5;500:54;489:65;;434:126;;;:::o;566:96::-;603:7;632:24;650:5;632:24;:::i;:::-;621:35;;566:96;;;:::o;668:118::-;755:24;773:5;755:24;:::i;:::-;750:3;743:37;668:118;;:::o;792:222::-;885:4;923:2;912:9;908:18;900:26;;936:71;1004:1;993:9;989:17;980:6;936:71;:::i;:::-;792:222;;;;:::o;1020:77::-;1057:7;1086:5;1075:16;;1020:77;;;:::o;1103:118::-;1190:24;1208:5;1190:24;:::i;:::-;1185:3;1178:37;1103:118;;:::o;1227:222::-;1320:4;1358:2;1347:9;1343:18;1335:26;;1371:71;1439:1;1428:9;1424:17;1415:6;1371:71;:::i;:::-;1227:222;;;;:::o;1536:117::-;1645:1;1642;1635:12;1782:122;1855:24;1873:5;1855:24;:::i;:::-;1848:5;1845:35;1835:63;;1894:1;1891;1884:12;1835:63;1782:122;:::o;1910:139::-;1956:5;1994:6;1981:20;1972:29;;2010:33;2037:5;2010:33;:::i;:::-;1910:139;;;;:::o;2055:122::-;2128:24;2146:5;2128:24;:::i;:::-;2121:5;2118:35;2108:63;;2167:1;2164;2157:12;2108:63;2055:122;:::o;2183:139::-;2229:5;2267:6;2254:20;2245:29;;2283:33;2310:5;2283:33;:::i;:::-;2183:139;;;;:::o;2328:1057::-;2432:6;2440;2448;2456;2464;2472;2521:3;2509:9;2500:7;2496:23;2492:33;2489:120;;;2528:79;;:::i;:::-;2489:120;2648:1;2673:53;2718:7;2709:6;2698:9;2694:22;2673:53;:::i;:::-;2663:63;;2619:117;2775:2;2801:53;2846:7;2837:6;2826:9;2822:22;2801:53;:::i;:::-;2791:63;;2746:118;2903:2;2929:53;2974:7;2965:6;2954:9;2950:22;2929:53;:::i;:::-;2919:63;;2874:118;3031:2;3057:53;3102:7;3093:6;3082:9;3078:22;3057:53;:::i;:::-;3047:63;;3002:118;3159:3;3186:53;3231:7;3222:6;3211:9;3207:22;3186:53;:::i;:::-;3176:63;;3130:119;3288:3;3315:53;3360:7;3351:6;3340:9;3336:22;3315:53;:::i;:::-;3305:63;;3259:119;2328:1057;;;;;;;;:::o;3391:116::-;3461:21;3476:5;3461:21;:::i;:::-;3454:5;3451:32;3441:60;;3497:1;3494;3487:12;3441:60;3391:116;:::o;3513:133::-;3556:5;3594:6;3581:20;3572:29;;3610:30;3634:5;3610:30;:::i;:::-;3513:133;;;;:::o;3652:323::-;3708:6;3757:2;3745:9;3736:7;3732:23;3728:32;3725:119;;;3763:79;;:::i;:::-;3725:119;3883:1;3908:50;3950:7;3941:6;3930:9;3926:22;3908:50;:::i;:::-;3898:60;;3854:114;3652:323;;;;:::o;3981:332::-;4102:4;4140:2;4129:9;4125:18;4117:26;;4153:71;4221:1;4210:9;4206:17;4197:6;4153:71;:::i;:::-;4234:72;4302:2;4291:9;4287:18;4278:6;4234:72;:::i;:::-;3981:332;;;;;:::o;4319:180::-;4367:77;4364:1;4357:88;4464:4;4461:1;4454:15;4488:4;4485:1;4478:15;4505:191;4545:3;4564:20;4582:1;4564:20;:::i;:::-;4559:25;;4598:20;4616:1;4598:20;:::i;:::-;4593:25;;4641:1;4638;4634:9;4627:16;;4662:3;4659:1;4656:10;4653:36;;;4669:18;;:::i;:::-;4653:36;4505:191;;;;:::o;4702:442::-;4851:4;4889:2;4878:9;4874:18;4866:26;;4902:71;4970:1;4959:9;4955:17;4946:6;4902:71;:::i;:::-;4983:72;5051:2;5040:9;5036:18;5027:6;4983:72;:::i;:::-;5065;5133:2;5122:9;5118:18;5109:6;5065:72;:::i;:::-;4702:442;;;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "arbiter()": "fe25e00a",
    "dispute()": "f240f7c3",
    "initialize(address,address,address,uint256,address,uint256)": "73c31134",
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
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.25+commit.b61c2a91\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"AlreadyInitialized\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CannotDisputeSettledEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CannotSettleYet\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotArbiter\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotAuthorized\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotDisputed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayer\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PaymentAlreadyRefunded\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PaymentAlreadySettled\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PaymentDisputed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"SafeERC20FailedOperation\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"disputeRemover\",\"type\":\"address\"}],\"name\":\"DisputeRemoved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"resolver\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"settled\",\"type\":\"bool\"}],\"name\":\"DisputeResolved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"disputeInitiator\",\"type\":\"address\"}],\"name\":\"Disputed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"}],\"name\":\"PayerSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Refunded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Settled\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"arbiter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"dispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_payee\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_arbiter\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"settleDeadline\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_paymentToken\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_paymentAmount\",\"type\":\"uint256\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isDisputed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isRefunded\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isSettled\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"payee\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"payer\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"paymentAmount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"paymentToken\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proposedArbiter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"refund\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"removeDispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"shouldSettle\",\"type\":\"bool\"}],\"name\":\"resolveDispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"settle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"settleTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"SafeERC20FailedOperation(address)\":[{\"details\":\"An operation with an ERC-20 token failed.\"}]},\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/SimpleEscrow.sol\":\"SimpleEscrow\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"]},\"sources\":{\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0x9b6b3e7803bc5f2f8cd7ad57db8ac1def61a9930a5a3107df4882e028a9605d7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da62d6be1f5c6edf577f0cb45666a8aa9c2086a4bac87d95d65f02e2f4c36a4b\",\"dweb:/ipfs/QmNkpvBpoCMvX8JwAFNSc5XxJ2q5BXJpL5L1txb4QkqVFF\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0xde7e9fd9aee8d4f40772f96bb3b58836cbc6dfc0227014a061947f8821ea9724\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://11fea9f8bc98949ac6709f0c1699db7430d2948137aa94d5a9e95a91f61a710a\",\"dweb:/ipfs/QmQdfRXxQjwP6yn3DVo1GHPpriKNcFghSPi94Z1oKEFUNS\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0xce41876e78d1badc0512229b4d14e4daf83bc1003d7f83978d18e0e56f965b9c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a2608291cb038b388d80b79a06b6118a42f7894ff67b7da10ec0dbbf5b2973ba\",\"dweb:/ipfs/QmWohqcBLbcxmA4eGPhZDXe5RYMMEEpFq22nfkaUMvTfw1\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xe06a3f08a987af6ad2e1c1e774405d4fe08f1694b67517438b467cecf0da0ef7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://df6f0c459663c9858b6cba2cda1d14a7d05a985bed6d2de72bd8e78c25ee79db\",\"dweb:/ipfs/QmeTTxZ7qVk9rjEv2R4CpCwdf8UMCcRqDNMvzNxHc3Fnn9\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x982c5cb790ab941d1e04f807120a71709d4c313ba0bfc16006447ffbd27fbbd5\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8150ceb4ac947e8a442b2a9c017e01e880b2be2dd958f1fa9bc405f4c5a86508\",\"dweb:/ipfs/QmbcBmFX66AY6Kbhnd5gx7zpkgqnUafo43XnmayAM7zVdB\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x79796192ec90263f21b464d5bc90b777a525971d3de8232be80d9c4f9fb353b8\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://f6fda447a62815e8064f47eff0dd1cf58d9207ad69b5d32280f8d7ed1d1e4621\",\"dweb:/ipfs/QmfDRc7pxfaXB2Dh9np5Uf29Na3pQ7tafRS684wd3GLjVL\"]},\"src/SimpleEscrow.sol\":{\"keccak256\":\"0x853fd45c81a3cd0b8ae86eff3abefd3ad2076780ca01d242e119384bd360c00b\",\"license\":\"GPL-3.0\",\"urls\":[\"bzz-raw://446ab04d5ba3b70796053a21b23be4289c82994b3e7b04460bd11675177b7470\",\"dweb:/ipfs/QmS11ZKR7W14t5dAKf5a33JexynLkz9fo7qJdzj94Voint\"]}},\"version\":1}",
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
            },
            {
              "internalType": "address",
              "name": "_paymentToken",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_paymentAmount",
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
        "keccak256": "0x853fd45c81a3cd0b8ae86eff3abefd3ad2076780ca01d242e119384bd360c00b",
        "urls": [
          "bzz-raw://446ab04d5ba3b70796053a21b23be4289c82994b3e7b04460bd11675177b7470",
          "dweb:/ipfs/QmS11ZKR7W14t5dAKf5a33JexynLkz9fo7qJdzj94Voint"
        ],
        "license": "GPL-3.0"
      }
    },
    "version": 1
  },
  "id": 26
} as const;
    export default SimpleEscrow
  
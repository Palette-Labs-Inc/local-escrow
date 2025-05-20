
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
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
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
        },
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "settle",
      "inputs": [
        {
          "name": "token",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
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
    "object": "0x6080604052348015600e575f80fd5b5061126a8061001c5f395ff3fe6080604052600436106100c5575f3560e01c80635c0b6d961161007e578063cf756fdf11610058578063cf756fdf14610244578063edc97a751461026c578063f240f7c314610282578063fe25e00a14610298576100cc565b80635c0b6d96146101c857806366101b64146101f0578063ae90b2131461021a576100cc565b80630335729e146100d0578063123119cd146100fa57806315afd409146101245780632806347c1461014c5780633270bb5b14610176578063410085df146101a0576100cc565b366100cc57005b5f80fd5b3480156100db575f80fd5b506100e46102c2565b6040516100f19190610f97565b60405180910390f35b348015610105575f80fd5b5061010e6102d5565b60405161011b9190610fef565b60405180910390f35b34801561012f575f80fd5b5061014a60048036038101906101459190611069565b6102fa565b005b348015610157575f80fd5b506101606105d8565b60405161016d9190610fef565b60405180910390f35b348015610181575f80fd5b5061018a6105fe565b6040516101979190610f97565b60405180910390f35b3480156101ab575f80fd5b506101c660048036038101906101c19190611069565b610611565b005b3480156101d3575f80fd5b506101ee60048036038101906101e991906110d1565b610736565b005b3480156101fb575f80fd5b50610204610997565b6040516102119190611130565b60405180910390f35b348015610225575f80fd5b5061022e61099d565b60405161023b9190610fef565b60405180910390f35b34801561024f575f80fd5b5061026a60048036038101906102659190611149565b6109c0565b005b348015610277575f80fd5b50610280610af7565b005b34801561028d575f80fd5b50610296610c43565b005b3480156102a3575f80fd5b506102ac610d91565b6040516102b99190610fef565b60405180910390f35b600260149054906101000a900460ff1681565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260149054906101000a900460ff1615610341576040517f24dc589a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141580156103e957505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610420576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610494576001600260156101000a81548160ff02191690831515021790555061053b565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361053a57600260159054906101000a900460ff168061050357506003544210155b610539576040517fc764a84f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b6105655f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a6883836040516105cc9291906111ad565b60405180910390a25050565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260159054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610695576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106c160015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b838360405161072a9291906111ad565b60405180910390a25050565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107bc576040517fccb665a600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610802576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82156108a6576108325f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a6883836040516108999291906111ad565b60405180910390a2610944565b6108d260015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b838360405161093b9291906111ad565b60405180910390a25b3373ffffffffffffffffffffffffffffffffffffffff167fcea2bc33eef9c2bacf266c2b7b17f8f2db3c22582cb56c00467843e85d98021e8460405161098a9190610f97565b60405180910390a2505050565b60035481565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045f9054906101000a900460ff1615610a06576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b835f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508042610ad19190611201565b600381905550600160045f6101000a81548160ff02191690831515021790555050505050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b7d576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610bc3576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f549a6c85fc7bef88326ec18b7449fc97c5bedfb5d649dbc056c88b579d1c34c760405160405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610cc9576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff1615610d10576040517faa0090ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f695fbf2fe28b4fde5705122279ffc4160ebfc0f45e4d96f7e6699001be5062ef60405160405180910390a2565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e32578273ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f19350505050158015610e2c573d5f803e3d5ffd5b50610e5e565b610e5d83828473ffffffffffffffffffffffffffffffffffffffff16610e639092919063ffffffff16565b5b505050565b610edd838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401610e969291906111ad565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610ee2565b505050565b5f8060205f8451602086015f885af180610f01576040513d5f823e3d81fd5b3d92505f519150505f8214610f1a576001811415610f35565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b15610f7757836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610f6e9190610fef565b60405180910390fd5b50505050565b5f8115159050919050565b610f9181610f7d565b82525050565b5f602082019050610faa5f830184610f88565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610fd982610fb0565b9050919050565b610fe981610fcf565b82525050565b5f6020820190506110025f830184610fe0565b92915050565b5f80fd5b61101581610fcf565b811461101f575f80fd5b50565b5f813590506110308161100c565b92915050565b5f819050919050565b61104881611036565b8114611052575f80fd5b50565b5f813590506110638161103f565b92915050565b5f806040838503121561107f5761107e611008565b5b5f61108c85828601611022565b925050602061109d85828601611055565b9150509250929050565b6110b081610f7d565b81146110ba575f80fd5b50565b5f813590506110cb816110a7565b92915050565b5f805f606084860312156110e8576110e7611008565b5b5f6110f5868287016110bd565b935050602061110686828701611022565b925050604061111786828701611055565b9150509250925092565b61112a81611036565b82525050565b5f6020820190506111435f830184611121565b92915050565b5f805f806080858703121561116157611160611008565b5b5f61116e87828801611022565b945050602061117f87828801611022565b935050604061119087828801611022565b92505060606111a187828801611055565b91505092959194509250565b5f6040820190506111c05f830185610fe0565b6111cd6020830184611121565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61120b82611036565b915061121683611036565b925082820190508082111561122e5761122d6111d4565b5b9291505056fea26469706673582212205772ee134beecd498abd0143a34e99b1566624b701cb9c9c112de0d6688e75e564736f6c63430008190033",
    "sourceMap": "480:3824:26:-:0;;;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x6080604052600436106100c5575f3560e01c80635c0b6d961161007e578063cf756fdf11610058578063cf756fdf14610244578063edc97a751461026c578063f240f7c314610282578063fe25e00a14610298576100cc565b80635c0b6d96146101c857806366101b64146101f0578063ae90b2131461021a576100cc565b80630335729e146100d0578063123119cd146100fa57806315afd409146101245780632806347c1461014c5780633270bb5b14610176578063410085df146101a0576100cc565b366100cc57005b5f80fd5b3480156100db575f80fd5b506100e46102c2565b6040516100f19190610f97565b60405180910390f35b348015610105575f80fd5b5061010e6102d5565b60405161011b9190610fef565b60405180910390f35b34801561012f575f80fd5b5061014a60048036038101906101459190611069565b6102fa565b005b348015610157575f80fd5b506101606105d8565b60405161016d9190610fef565b60405180910390f35b348015610181575f80fd5b5061018a6105fe565b6040516101979190610f97565b60405180910390f35b3480156101ab575f80fd5b506101c660048036038101906101c19190611069565b610611565b005b3480156101d3575f80fd5b506101ee60048036038101906101e991906110d1565b610736565b005b3480156101fb575f80fd5b50610204610997565b6040516102119190611130565b60405180910390f35b348015610225575f80fd5b5061022e61099d565b60405161023b9190610fef565b60405180910390f35b34801561024f575f80fd5b5061026a60048036038101906102659190611149565b6109c0565b005b348015610277575f80fd5b50610280610af7565b005b34801561028d575f80fd5b50610296610c43565b005b3480156102a3575f80fd5b506102ac610d91565b6040516102b99190610fef565b60405180910390f35b600260149054906101000a900460ff1681565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260149054906101000a900460ff1615610341576040517f24dc589a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141580156103e957505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610420576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610494576001600260156101000a81548160ff02191690831515021790555061053b565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361053a57600260159054906101000a900460ff168061050357506003544210155b610539576040517fc764a84f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b6105655f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a6883836040516105cc9291906111ad565b60405180910390a25050565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260159054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610695576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106c160015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b838360405161072a9291906111ad565b60405180910390a25050565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107bc576040517fccb665a600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610802576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82156108a6576108325f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a6883836040516108999291906111ad565b60405180910390a2610944565b6108d260015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b838360405161093b9291906111ad565b60405180910390a25b3373ffffffffffffffffffffffffffffffffffffffff167fcea2bc33eef9c2bacf266c2b7b17f8f2db3c22582cb56c00467843e85d98021e8460405161098a9190610f97565b60405180910390a2505050565b60035481565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045f9054906101000a900460ff1615610a06576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b835f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508042610ad19190611201565b600381905550600160045f6101000a81548160ff02191690831515021790555050505050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b7d576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610bc3576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f549a6c85fc7bef88326ec18b7449fc97c5bedfb5d649dbc056c88b579d1c34c760405160405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610cc9576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff1615610d10576040517faa0090ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f695fbf2fe28b4fde5705122279ffc4160ebfc0f45e4d96f7e6699001be5062ef60405160405180910390a2565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e32578273ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f19350505050158015610e2c573d5f803e3d5ffd5b50610e5e565b610e5d83828473ffffffffffffffffffffffffffffffffffffffff16610e639092919063ffffffff16565b5b505050565b610edd838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401610e969291906111ad565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610ee2565b505050565b5f8060205f8451602086015f885af180610f01576040513d5f823e3d81fd5b3d92505f519150505f8214610f1a576001811415610f35565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b15610f7757836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610f6e9190610fef565b60405180910390fd5b50505050565b5f8115159050919050565b610f9181610f7d565b82525050565b5f602082019050610faa5f830184610f88565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610fd982610fb0565b9050919050565b610fe981610fcf565b82525050565b5f6020820190506110025f830184610fe0565b92915050565b5f80fd5b61101581610fcf565b811461101f575f80fd5b50565b5f813590506110308161100c565b92915050565b5f819050919050565b61104881611036565b8114611052575f80fd5b50565b5f813590506110638161103f565b92915050565b5f806040838503121561107f5761107e611008565b5b5f61108c85828601611022565b925050602061109d85828601611055565b9150509250929050565b6110b081610f7d565b81146110ba575f80fd5b50565b5f813590506110cb816110a7565b92915050565b5f805f606084860312156110e8576110e7611008565b5b5f6110f5868287016110bd565b935050602061110686828701611022565b925050604061111786828701611055565b9150509250925092565b61112a81611036565b82525050565b5f6020820190506111435f830184611121565b92915050565b5f805f806080858703121561116157611160611008565b5b5f61116e87828801611022565b945050602061117f87828801611022565b935050604061119087828801611022565b92505060606111a187828801611055565b91505092959194509250565b5f6040820190506111c05f830185610fe0565b6111cd6020830184611121565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61120b82611036565b915061121683611036565b925082820190508082111561122e5761122d6111d4565b5b9291505056fea26469706673582212205772ee134beecd498abd0143a34e99b1566624b701cb9c9c112de0d6688e75e564736f6c63430008190033",
    "sourceMap": "480:3824:26:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;620:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;566:20;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2305:692;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;736:30;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;648:21;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3003:166;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;3571:485;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;675:25;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;540:20;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;1675:589;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;3367:186;;;;;;;;;;;;;:::i;:::-;;3175;;;;;;;;;;;;;:::i;:::-;;592:22;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;620;;;;;;;;;;;;;:::o;566:20::-;;;;;;;;;;;;;:::o;2305:692::-;2375:10;;;;;;;;;;;2371:65;;;2408:17;;;;;;;;;;;;;;2371:65;2463:5;;;;;;;;;;;2449:19;;:10;:19;;;;:42;;;;;2486:5;;;;;;;;;;2472:19;;:10;:19;;;;2449:42;2445:95;;;2514:15;;;;;;;;;;;;;;2445:95;2576:5;;;;;;;;;;;2562:19;;:10;:19;;;2558:340;;2609:4;2597:9;;:16;;;;;;;;;;;;;;;;;;2558:340;;;2648:5;;;;;;;;;;2634:19;;:10;:19;;;2630:268;;2675:9;;;;;;;;;;;:42;;;;2707:10;;2688:15;:29;;2675:42;2669:219;;2776:17;;;;;;;;;;;;;;2669:219;2630:268;2558:340;2908:38;2925:5;;;;;;;;;;2932;2939:6;2908:16;:38::i;:::-;2969:5;;;;;;;;;;2961:29;;;2976:5;2983:6;2961:29;;;;;;;:::i;:::-;;;;;;;;2305:692;;:::o;736:30::-;;;;;;;;;;;;;:::o;648:21::-;;;;;;;;;;;;;:::o;3003:166::-;1435:5;;;;;;;;;;1421:19;;:10;:19;;;1417:73;;1463:15;;;;;;;;;;;;;;1417:73;3079:38:::1;3096:5;;;;;;;;;;;3103;3110:6;3079:16;:38::i;:::-;3141:5;;;;;;;;;;;3132:30;;;3148:5;3155:6;3132:30;;;;;;;:::i;:::-;;;;;;;;3003:166:::0;;:::o;3571:485::-;1189:7;;;;;;;;;;;1175:21;;:10;:21;;;1171:71;;1219:12;;;;;;;;;;;;;;1171:71;3681:10:::1;;;;;;;;;;;3676:62;;3714:13;;;;;;;;;;;;;;3676:62;3751:12;3747:247;;;3779:38;3796:5;::::0;::::1;;;;;;;;3803;3810:6;3779:16;:38::i;:::-;3844:5;::::0;::::1;;;;;;;;3836:29;;;3851:5;3858:6;3836:29;;;;;;;:::i;:::-;;;;;;;;3747:247;;;3896:38;3913:5;;;;;;;;;;;3920;3927:6;3896:16;:38::i;:::-;3962:5;;;;;;;;;;;3953:30;;;3969:5;3976:6;3953:30;;;;;;;:::i;:::-;;;;;;;;3747:247;4024:10;4008:41;;;4036:12;4008:41;;;;;;:::i;:::-;;;;;;;;3571:485:::0;;;:::o;675:25::-;;;;:::o;540:20::-;;;;;;;;;;;;:::o;1675:589::-;1792:11;;;;;;;;;;;1788:69;;;1826:20;;;;;;;;;;;;;;1788:69;1874:6;1866:5;;:14;;;;;;;;;;;;;;;;;;1900:8;1890:7;;:18;;;;;;;;;;;;;;;;;;1926:6;1918:5;;:14;;;;;;;;;;;;;;;;;;1973;1955:15;:32;;;;:::i;:::-;1942:10;:45;;;;2095:4;2081:11;;:18;;;;;;;;;;;;;;;;;;1675:589;;;;:::o;3367:186::-;1314:5;;;;;;;;;;;1300:19;;:10;:19;;;1296:67;;1342:10;;;;;;;;;;;;;;1296:67;3426:10:::1;;;;;;;;;;;3421:62;;3459:13;;;;;;;;;;;;;;3421:62;3505:5;3492:10;;:18;;;;;;;;;;;;;;;;;;3540:5;;;;;;;;;;;3525:21;;;;;;;;;;;;3367:186::o:0;3175:::-;1314:5;;;;;;;;;;;1300:19;;:10;:19;;;1296:67;;1342:10;;;;;;;;;;;;;;1296:67;3227:9:::1;;;;;;;;;;;3223:75;;;3259:28;;;;;;;;;;;;;;3223:75;3320:4;3307:10;;:17;;;;;;;;;;;;;;;;;;3348:5;;;;;;;;;;;3339:15;;;;;;;;;;;;3175:186::o:0;592:22::-;;;;;;;;;;;;;:::o;4062:240::-;4170:1;4153:19;;:5;:19;;;4149:147;;4196:2;4188:20;;:28;4209:6;4188:28;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4149:147;;;4247:38;4274:2;4278:6;4254:5;4247:26;;;;:38;;;;;:::i;:::-;4149:147;4062:240;;;:::o;1219:160:20:-;1301:71;1321:5;1343;:14;;;1360:2;1364:5;1328:43;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1301:19;:71::i;:::-;1219:160;;;:::o;8370:720::-;8450:18;8478:19;8616:4;8613:1;8606:4;8600:11;8593:4;8587;8583:15;8580:1;8573:5;8566;8561:60;8673:7;8663:176;;8717:4;8711:11;8762:16;8759:1;8754:3;8739:40;8808:16;8803:3;8796:29;8663:176;8866:16;8852:30;;8916:1;8910:8;8895:23;;8532:396;8956:1;8942:10;:15;:68;;9009:1;8994:11;:16;;8942:68;;;8990:1;8968:5;8960:26;;;:31;8942:68;8938:146;;;9066:5;9033:40;;;;;;;;;;;:::i;:::-;;;;;;;;8938:146;8440:650;;8370:720;;:::o;7:90:27:-;41:7;84:5;77:13;70:21;59:32;;7:90;;;:::o;103:109::-;184:21;199:5;184:21;:::i;:::-;179:3;172:34;103:109;;:::o;218:210::-;305:4;343:2;332:9;328:18;320:26;;356:65;418:1;407:9;403:17;394:6;356:65;:::i;:::-;218:210;;;;:::o;434:126::-;471:7;511:42;504:5;500:54;489:65;;434:126;;;:::o;566:96::-;603:7;632:24;650:5;632:24;:::i;:::-;621:35;;566:96;;;:::o;668:118::-;755:24;773:5;755:24;:::i;:::-;750:3;743:37;668:118;;:::o;792:222::-;885:4;923:2;912:9;908:18;900:26;;936:71;1004:1;993:9;989:17;980:6;936:71;:::i;:::-;792:222;;;;:::o;1101:117::-;1210:1;1207;1200:12;1347:122;1420:24;1438:5;1420:24;:::i;:::-;1413:5;1410:35;1400:63;;1459:1;1456;1449:12;1400:63;1347:122;:::o;1475:139::-;1521:5;1559:6;1546:20;1537:29;;1575:33;1602:5;1575:33;:::i;:::-;1475:139;;;;:::o;1620:77::-;1657:7;1686:5;1675:16;;1620:77;;;:::o;1703:122::-;1776:24;1794:5;1776:24;:::i;:::-;1769:5;1766:35;1756:63;;1815:1;1812;1805:12;1756:63;1703:122;:::o;1831:139::-;1877:5;1915:6;1902:20;1893:29;;1931:33;1958:5;1931:33;:::i;:::-;1831:139;;;;:::o;1976:474::-;2044:6;2052;2101:2;2089:9;2080:7;2076:23;2072:32;2069:119;;;2107:79;;:::i;:::-;2069:119;2227:1;2252:53;2297:7;2288:6;2277:9;2273:22;2252:53;:::i;:::-;2242:63;;2198:117;2354:2;2380:53;2425:7;2416:6;2405:9;2401:22;2380:53;:::i;:::-;2370:63;;2325:118;1976:474;;;;;:::o;2456:116::-;2526:21;2541:5;2526:21;:::i;:::-;2519:5;2516:32;2506:60;;2562:1;2559;2552:12;2506:60;2456:116;:::o;2578:133::-;2621:5;2659:6;2646:20;2637:29;;2675:30;2699:5;2675:30;:::i;:::-;2578:133;;;;:::o;2717:613::-;2791:6;2799;2807;2856:2;2844:9;2835:7;2831:23;2827:32;2824:119;;;2862:79;;:::i;:::-;2824:119;2982:1;3007:50;3049:7;3040:6;3029:9;3025:22;3007:50;:::i;:::-;2997:60;;2953:114;3106:2;3132:53;3177:7;3168:6;3157:9;3153:22;3132:53;:::i;:::-;3122:63;;3077:118;3234:2;3260:53;3305:7;3296:6;3285:9;3281:22;3260:53;:::i;:::-;3250:63;;3205:118;2717:613;;;;;:::o;3336:118::-;3423:24;3441:5;3423:24;:::i;:::-;3418:3;3411:37;3336:118;;:::o;3460:222::-;3553:4;3591:2;3580:9;3576:18;3568:26;;3604:71;3672:1;3661:9;3657:17;3648:6;3604:71;:::i;:::-;3460:222;;;;:::o;3688:765::-;3774:6;3782;3790;3798;3847:3;3835:9;3826:7;3822:23;3818:33;3815:120;;;3854:79;;:::i;:::-;3815:120;3974:1;3999:53;4044:7;4035:6;4024:9;4020:22;3999:53;:::i;:::-;3989:63;;3945:117;4101:2;4127:53;4172:7;4163:6;4152:9;4148:22;4127:53;:::i;:::-;4117:63;;4072:118;4229:2;4255:53;4300:7;4291:6;4280:9;4276:22;4255:53;:::i;:::-;4245:63;;4200:118;4357:2;4383:53;4428:7;4419:6;4408:9;4404:22;4383:53;:::i;:::-;4373:63;;4328:118;3688:765;;;;;;;:::o;4459:332::-;4580:4;4618:2;4607:9;4603:18;4595:26;;4631:71;4699:1;4688:9;4684:17;4675:6;4631:71;:::i;:::-;4712:72;4780:2;4769:9;4765:18;4756:6;4712:72;:::i;:::-;4459:332;;;;;:::o;4797:180::-;4845:77;4842:1;4835:88;4942:4;4939:1;4932:15;4966:4;4963:1;4956:15;4983:191;5023:3;5042:20;5060:1;5042:20;:::i;:::-;5037:25;;5076:20;5094:1;5076:20;:::i;:::-;5071:25;;5119:1;5116;5112:9;5105:16;;5140:3;5137:1;5134:10;5131:36;;;5147:18;;:::i;:::-;5131:36;4983:191;;;;:::o",
    "linkReferences": {}
  },
  "methodIdentifiers": {
    "arbiter()": "fe25e00a",
    "dispute()": "f240f7c3",
    "initialize(address,address,address,uint256)": "cf756fdf",
    "isDisputed()": "0335729e",
    "isSettled()": "3270bb5b",
    "payee()": "ae90b213",
    "payer()": "123119cd",
    "proposedArbiter()": "2806347c",
    "refund(address,uint256)": "410085df",
    "removeDispute()": "edc97a75",
    "resolveDispute(bool,address,uint256)": "5c0b6d96",
    "settle(address,uint256)": "15afd409",
    "settleTime()": "66101b64"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.25+commit.b61c2a91\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"AlreadyInitialized\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CannotDisputeSettledEscrow\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"CannotSettleYet\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotArbiter\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotAuthorized\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotDisputed\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotPayer\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"PaymentDisputed\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"}],\"name\":\"SafeERC20FailedOperation\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"disputeRemover\",\"type\":\"address\"}],\"name\":\"DisputeRemoved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"resolver\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"settled\",\"type\":\"bool\"}],\"name\":\"DisputeResolved\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"disputeInitiator\",\"type\":\"address\"}],\"name\":\"Disputed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"}],\"name\":\"PayerSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Refunded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Settled\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"arbiter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"dispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_payee\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_payer\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_arbiter\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"settleDeadline\",\"type\":\"uint256\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isDisputed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isSettled\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"payee\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"payer\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"proposedArbiter\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"refund\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"removeDispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"shouldSettle\",\"type\":\"bool\"},{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"resolveDispute\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"settle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"settleTime\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"errors\":{\"SafeERC20FailedOperation(address)\":[{\"details\":\"An operation with an ERC-20 token failed.\"}]},\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/SimpleEscrow.sol\":\"SimpleEscrow\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"]},\"sources\":{\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0x9b6b3e7803bc5f2f8cd7ad57db8ac1def61a9930a5a3107df4882e028a9605d7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da62d6be1f5c6edf577f0cb45666a8aa9c2086a4bac87d95d65f02e2f4c36a4b\",\"dweb:/ipfs/QmNkpvBpoCMvX8JwAFNSc5XxJ2q5BXJpL5L1txb4QkqVFF\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0xde7e9fd9aee8d4f40772f96bb3b58836cbc6dfc0227014a061947f8821ea9724\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://11fea9f8bc98949ac6709f0c1699db7430d2948137aa94d5a9e95a91f61a710a\",\"dweb:/ipfs/QmQdfRXxQjwP6yn3DVo1GHPpriKNcFghSPi94Z1oKEFUNS\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0xce41876e78d1badc0512229b4d14e4daf83bc1003d7f83978d18e0e56f965b9c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a2608291cb038b388d80b79a06b6118a42f7894ff67b7da10ec0dbbf5b2973ba\",\"dweb:/ipfs/QmWohqcBLbcxmA4eGPhZDXe5RYMMEEpFq22nfkaUMvTfw1\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xe06a3f08a987af6ad2e1c1e774405d4fe08f1694b67517438b467cecf0da0ef7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://df6f0c459663c9858b6cba2cda1d14a7d05a985bed6d2de72bd8e78c25ee79db\",\"dweb:/ipfs/QmeTTxZ7qVk9rjEv2R4CpCwdf8UMCcRqDNMvzNxHc3Fnn9\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x982c5cb790ab941d1e04f807120a71709d4c313ba0bfc16006447ffbd27fbbd5\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8150ceb4ac947e8a442b2a9c017e01e880b2be2dd958f1fa9bc405f4c5a86508\",\"dweb:/ipfs/QmbcBmFX66AY6Kbhnd5gx7zpkgqnUafo43XnmayAM7zVdB\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x79796192ec90263f21b464d5bc90b777a525971d3de8232be80d9c4f9fb353b8\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://f6fda447a62815e8064f47eff0dd1cf58d9207ad69b5d32280f8d7ed1d1e4621\",\"dweb:/ipfs/QmfDRc7pxfaXB2Dh9np5Uf29Na3pQ7tafRS684wd3GLjVL\"]},\"src/SimpleEscrow.sol\":{\"keccak256\":\"0xb3e5b8e615ac4ef9c659fe92b385e4750981cb2bbcd17d8d9bb52ede45e87f7e\",\"license\":\"GPL-3.0\",\"urls\":[\"bzz-raw://3ca7dd20e17d7b98a97bf2a6d29898100e2bb82685bcbcdd75f038fe575b5fa6\",\"dweb:/ipfs/QmVsvfKXPk2wSBJDZAxzzKG2GDddzUsZ7hbPg5dBBa1Jhz\"]}},\"version\":1}",
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
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
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
            },
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function",
          "name": "resolveDispute"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
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
        "keccak256": "0xb3e5b8e615ac4ef9c659fe92b385e4750981cb2bbcd17d8d9bb52ede45e87f7e",
        "urls": [
          "bzz-raw://3ca7dd20e17d7b98a97bf2a6d29898100e2bb82685bcbcdd75f038fe575b5fa6",
          "dweb:/ipfs/QmVsvfKXPk2wSBJDZAxzzKG2GDddzUsZ7hbPg5dBBa1Jhz"
        ],
        "license": "GPL-3.0"
      }
    },
    "version": 1
  },
  "id": 26
} as const;
    export default SimpleEscrow
  
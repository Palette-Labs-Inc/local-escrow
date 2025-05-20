
    const EscrowFactory = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "createEscrow",
      "inputs": [
        {
          "name": "payee",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "arbiter",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "settleDeadline",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "escrowImplementation",
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
      "type": "event",
      "name": "EscrowCreated",
      "inputs": [
        {
          "name": "escrowAddress",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "payee",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "payer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "arbiter",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "FailedDeployment",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InsufficientBalance",
      "inputs": [
        {
          "name": "balance",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "needed",
          "type": "uint256",
          "internalType": "uint256"
        }
      ]
    }
  ],
  "bytecode": {
    "object": "0x60a0604052348015600e575f80fd5b506040516019906069565b604051809103905ff0801580156031573d5f803e3d5ffd5b5073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250506076565b6112868061053283390190565b60805161049f6100935f395f81816088015260b1015261049f5ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c80634ca8ff5a14610038578063c361765014610056575b5f80fd5b610040610086565b60405161004d9190610326565b60405180910390f35b610070600480360381019061006b91906103a0565b6100aa565b60405161007d9190610326565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b5f806100eb7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166101e0565b90508073ffffffffffffffffffffffffffffffffffffffff1663cf756fdf863387876040518563ffffffff1660e01b815260040161012c94939291906103ff565b5f604051808303815f87803b158015610143575f80fd5b505af1158015610155573d5f803e3d5ffd5b505050503373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f9d6330c40b62e9b3318783aac74e1b766472a80cc5298f1a06e5106eb7c58a8e876040516101cd9190610326565b60405180910390a4809150509392505050565b5f6101eb825f6101f2565b9050919050565b5f8147101561023a5747826040517fcf479181000000000000000000000000000000000000000000000000000000008152600401610231929190610442565b60405180910390fd5b763d602d80600a3d3981f3363d3d373d3d3d363d730000008360601b60e81c175f526e5af43d82803e903d91602b57fd5bf38360781b176020526037600983f090505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036102e1576040517fb06ebf3d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610310826102e7565b9050919050565b61032081610306565b82525050565b5f6020820190506103395f830184610317565b92915050565b5f80fd5b61034c81610306565b8114610356575f80fd5b50565b5f8135905061036781610343565b92915050565b5f819050919050565b61037f8161036d565b8114610389575f80fd5b50565b5f8135905061039a81610376565b92915050565b5f805f606084860312156103b7576103b661033f565b5b5f6103c486828701610359565b93505060206103d586828701610359565b92505060406103e68682870161038c565b9150509250925092565b6103f98161036d565b82525050565b5f6080820190506104125f830187610317565b61041f6020830186610317565b61042c6040830185610317565b61043960608301846103f0565b95945050505050565b5f6040820190506104555f8301856103f0565b61046260208301846103f0565b939250505056fea2646970667358221220a654259640798f46284b63602cb8f98284f9bc6ce9bb256df0a56681d7c7b70a64736f6c634300081900336080604052348015600e575f80fd5b5061126a8061001c5f395ff3fe6080604052600436106100c5575f3560e01c80635c0b6d961161007e578063cf756fdf11610058578063cf756fdf14610244578063edc97a751461026c578063f240f7c314610282578063fe25e00a14610298576100cc565b80635c0b6d96146101c857806366101b64146101f0578063ae90b2131461021a576100cc565b80630335729e146100d0578063123119cd146100fa57806315afd409146101245780632806347c1461014c5780633270bb5b14610176578063410085df146101a0576100cc565b366100cc57005b5f80fd5b3480156100db575f80fd5b506100e46102c2565b6040516100f19190610f97565b60405180910390f35b348015610105575f80fd5b5061010e6102d5565b60405161011b9190610fef565b60405180910390f35b34801561012f575f80fd5b5061014a60048036038101906101459190611069565b6102fa565b005b348015610157575f80fd5b506101606105d8565b60405161016d9190610fef565b60405180910390f35b348015610181575f80fd5b5061018a6105fe565b6040516101979190610f97565b60405180910390f35b3480156101ab575f80fd5b506101c660048036038101906101c19190611069565b610611565b005b3480156101d3575f80fd5b506101ee60048036038101906101e991906110d1565b610736565b005b3480156101fb575f80fd5b50610204610997565b6040516102119190611130565b60405180910390f35b348015610225575f80fd5b5061022e61099d565b60405161023b9190610fef565b60405180910390f35b34801561024f575f80fd5b5061026a60048036038101906102659190611149565b6109c0565b005b348015610277575f80fd5b50610280610af7565b005b34801561028d575f80fd5b50610296610c43565b005b3480156102a3575f80fd5b506102ac610d91565b6040516102b99190610fef565b60405180910390f35b600260149054906101000a900460ff1681565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260149054906101000a900460ff1615610341576040517f24dc589a00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141580156103e957505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610420576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1603610494576001600260156101000a81548160ff02191690831515021790555061053b565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361053a57600260159054906101000a900460ff168061050357506003544210155b610539576040517fc764a84f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5b5b6105655f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a6883836040516105cc9291906111ad565b60405180910390a25050565b600460019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260159054906101000a900460ff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610695576040517fea8e4eb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106c160015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b838360405161072a9291906111ad565b60405180910390a25050565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146107bc576040517fccb665a600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610802576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b82156108a6576108325f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f7e79a2206061184e05985ae0578dec52f817756a441996f984cdc817efc25a6883836040516108999291906111ad565b60405180910390a2610944565b6108d260015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168383610db6565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fec1e5ed733e00f1a00915d56caef57b4f52312dde4f9b3165f213319a0da156b838360405161093b9291906111ad565b60405180910390a25b3373ffffffffffffffffffffffffffffffffffffffff167fcea2bc33eef9c2bacf266c2b7b17f8f2db3c22582cb56c00467843e85d98021e8460405161098a9190610f97565b60405180910390a2505050565b60035481565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045f9054906101000a900460ff1615610a06576040517f0dc149f000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b835f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508042610ad19190611201565b600381905550600160045f6101000a81548160ff02191690831515021790555050505050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b7d576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260149054906101000a900460ff16610bc3576040517f433b0e1400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f549a6c85fc7bef88326ec18b7449fc97c5bedfb5d649dbc056c88b579d1c34c760405160405180910390a2565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610cc9576040517f1435e35700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600260159054906101000a900460ff1615610d10576040517faa0090ba00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600260146101000a81548160ff02191690831515021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f695fbf2fe28b4fde5705122279ffc4160ebfc0f45e4d96f7e6699001be5062ef60405160405180910390a2565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e32578273ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f19350505050158015610e2c573d5f803e3d5ffd5b50610e5e565b610e5d83828473ffffffffffffffffffffffffffffffffffffffff16610e639092919063ffffffff16565b5b505050565b610edd838473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401610e969291906111ad565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610ee2565b505050565b5f8060205f8451602086015f885af180610f01576040513d5f823e3d81fd5b3d92505f519150505f8214610f1a576001811415610f35565b5f8473ffffffffffffffffffffffffffffffffffffffff163b145b15610f7757836040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610f6e9190610fef565b60405180910390fd5b50505050565b5f8115159050919050565b610f9181610f7d565b82525050565b5f602082019050610faa5f830184610f88565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610fd982610fb0565b9050919050565b610fe981610fcf565b82525050565b5f6020820190506110025f830184610fe0565b92915050565b5f80fd5b61101581610fcf565b811461101f575f80fd5b50565b5f813590506110308161100c565b92915050565b5f819050919050565b61104881611036565b8114611052575f80fd5b50565b5f813590506110638161103f565b92915050565b5f806040838503121561107f5761107e611008565b5b5f61108c85828601611022565b925050602061109d85828601611055565b9150509250929050565b6110b081610f7d565b81146110ba575f80fd5b50565b5f813590506110cb816110a7565b92915050565b5f805f606084860312156110e8576110e7611008565b5b5f6110f5868287016110bd565b935050602061110686828701611022565b925050604061111786828701611055565b9150509250925092565b61112a81611036565b82525050565b5f6020820190506111435f830184611121565b92915050565b5f805f806080858703121561116157611160611008565b5b5f61116e87828801611022565b945050602061117f87828801611022565b935050604061119087828801611022565b92505060606111a187828801611055565b91505092959194509250565b5f6040820190506111c05f830185610fe0565b6111cd6020830184611121565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61120b82611036565b915061121683611036565b925082820190508082111561122e5761122d6111d4565b5b9291505056fea26469706673582212205772ee134beecd498abd0143a34e99b1566624b701cb9c9c112de0d6688e75e564736f6c63430008190033",
    "sourceMap": "177:1096:25:-:0;;;413:145;;;;;;;;;;532:18;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;501:50;;;;;;;;;;177:1096;;;;;;;;;;:::o;:::-;;;;;;;;;;;;;;;;;;",
    "linkReferences": {}
  },
  "deployedBytecode": {
    "object": "0x608060405234801561000f575f80fd5b5060043610610034575f3560e01c80634ca8ff5a14610038578063c361765014610056575b5f80fd5b610040610086565b60405161004d9190610326565b60405180910390f35b610070600480360381019061006b91906103a0565b6100aa565b60405161007d9190610326565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b5f806100eb7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166101e0565b90508073ffffffffffffffffffffffffffffffffffffffff1663cf756fdf863387876040518563ffffffff1660e01b815260040161012c94939291906103ff565b5f604051808303815f87803b158015610143575f80fd5b505af1158015610155573d5f803e3d5ffd5b505050503373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f9d6330c40b62e9b3318783aac74e1b766472a80cc5298f1a06e5106eb7c58a8e876040516101cd9190610326565b60405180910390a4809150509392505050565b5f6101eb825f6101f2565b9050919050565b5f8147101561023a5747826040517fcf479181000000000000000000000000000000000000000000000000000000008152600401610231929190610442565b60405180910390fd5b763d602d80600a3d3981f3363d3d373d3d3d363d730000008360601b60e81c175f526e5af43d82803e903d91602b57fd5bf38360781b176020526037600983f090505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036102e1576040517fb06ebf3d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610310826102e7565b9050919050565b61032081610306565b82525050565b5f6020820190506103395f830184610317565b92915050565b5f80fd5b61034c81610306565b8114610356575f80fd5b50565b5f8135905061036781610343565b92915050565b5f819050919050565b61037f8161036d565b8114610389575f80fd5b50565b5f8135905061039a81610376565b92915050565b5f805f606084860312156103b7576103b661033f565b5b5f6103c486828701610359565b93505060206103d586828701610359565b92505060406103e68682870161038c565b9150509250925092565b6103f98161036d565b82525050565b5f6080820190506104125f830187610317565b61041f6020830186610317565b61042c6040830185610317565b61043960608301846103f0565b95945050505050565b5f6040820190506104555f8301856103f0565b61046260208301846103f0565b939250505056fea2646970667358221220a654259640798f46284b63602cb8f98284f9bc6ce9bb256df0a56681d7c7b70a64736f6c63430008190033",
    "sourceMap": "177:1096:25:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;237:45;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;564:707;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;237:45;;;:::o;564:707::-;756:7;813:28;852;:20;:26;;;:28::i;:::-;813:68;;1096:12;1083:37;;;1121:5;1128:10;1140:7;1149:14;1083:81;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1215:10;1180:55;;1208:5;1180:55;;1194:12;1180:55;;;1227:7;1180:55;;;;;;:::i;:::-;;;;;;;;1252:12;1245:19;;;564:707;;;;;:::o;1070:123:18:-;1127:16;1162:24;1168:14;1184:1;1162:5;:24::i;:::-;1155:31;;1070:123;;;:::o;1585:910::-;1657:16;1713:5;1689:21;:29;1685:123;;;1768:21;1791:5;1741:56;;;;;;;;;;;;:::i;:::-;;;;;;;;1685:123;2094:48;2076:14;2070:4;2066:25;2060:4;2056:36;2053:90;2047:4;2040:104;2301:32;2284:14;2278:4;2274:25;2271:63;2265:4;2258:77;2380:4;2374;2367:5;2360:25;2348:37;;2428:1;2408:22;;:8;:22;;;2404:85;;2453:25;;;;;;;;;;;;;;2404:85;1585:910;;;;:::o;7:126:27:-;44:7;84:42;77:5;73:54;62:65;;7:126;;;:::o;139:96::-;176:7;205:24;223:5;205:24;:::i;:::-;194:35;;139:96;;;:::o;241:118::-;328:24;346:5;328:24;:::i;:::-;323:3;316:37;241:118;;:::o;365:222::-;458:4;496:2;485:9;481:18;473:26;;509:71;577:1;566:9;562:17;553:6;509:71;:::i;:::-;365:222;;;;:::o;674:117::-;783:1;780;773:12;920:122;993:24;1011:5;993:24;:::i;:::-;986:5;983:35;973:63;;1032:1;1029;1022:12;973:63;920:122;:::o;1048:139::-;1094:5;1132:6;1119:20;1110:29;;1148:33;1175:5;1148:33;:::i;:::-;1048:139;;;;:::o;1193:77::-;1230:7;1259:5;1248:16;;1193:77;;;:::o;1276:122::-;1349:24;1367:5;1349:24;:::i;:::-;1342:5;1339:35;1329:63;;1388:1;1385;1378:12;1329:63;1276:122;:::o;1404:139::-;1450:5;1488:6;1475:20;1466:29;;1504:33;1531:5;1504:33;:::i;:::-;1404:139;;;;:::o;1549:619::-;1626:6;1634;1642;1691:2;1679:9;1670:7;1666:23;1662:32;1659:119;;;1697:79;;:::i;:::-;1659:119;1817:1;1842:53;1887:7;1878:6;1867:9;1863:22;1842:53;:::i;:::-;1832:63;;1788:117;1944:2;1970:53;2015:7;2006:6;1995:9;1991:22;1970:53;:::i;:::-;1960:63;;1915:118;2072:2;2098:53;2143:7;2134:6;2123:9;2119:22;2098:53;:::i;:::-;2088:63;;2043:118;1549:619;;;;;:::o;2174:118::-;2261:24;2279:5;2261:24;:::i;:::-;2256:3;2249:37;2174:118;;:::o;2298:553::-;2475:4;2513:3;2502:9;2498:19;2490:27;;2527:71;2595:1;2584:9;2580:17;2571:6;2527:71;:::i;:::-;2608:72;2676:2;2665:9;2661:18;2652:6;2608:72;:::i;:::-;2690;2758:2;2747:9;2743:18;2734:6;2690:72;:::i;:::-;2772;2840:2;2829:9;2825:18;2816:6;2772:72;:::i;:::-;2298:553;;;;;;;:::o;2857:332::-;2978:4;3016:2;3005:9;3001:18;2993:26;;3029:71;3097:1;3086:9;3082:17;3073:6;3029:71;:::i;:::-;3110:72;3178:2;3167:9;3163:18;3154:6;3110:72;:::i;:::-;2857:332;;;;;:::o",
    "linkReferences": {},
    "immutableReferences": {
      "36617": [
        {
          "start": 136,
          "length": 32
        },
        {
          "start": 177,
          "length": 32
        }
      ]
    }
  },
  "methodIdentifiers": {
    "createEscrow(address,address,uint256)": "c3617650",
    "escrowImplementation()": "4ca8ff5a"
  },
  "rawMetadata": "{\"compiler\":{\"version\":\"0.8.25+commit.b61c2a91\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"FailedDeployment\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"needed\",\"type\":\"uint256\"}],\"name\":\"InsufficientBalance\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"escrowAddress\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"payee\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"payer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"}],\"name\":\"EscrowCreated\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"payee\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"arbiter\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"settleDeadline\",\"type\":\"uint256\"}],\"name\":\"createEscrow\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"escrowImplementation\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"errors\":{\"FailedDeployment()\":[{\"details\":\"The deployment failed.\"}],\"InsufficientBalance(uint256,uint256)\":[{\"details\":\"The ETH balance of the account is not enough to perform the operation.\"}]},\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"src/EscrowFactory.sol\":\"EscrowFactory\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[\":@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/\",\":erc4626-tests/=lib/openzeppelin-contracts/lib/erc4626-tests/\",\":forge-std/=lib/forge-std/src/\",\":halmos-cheatcodes/=lib/openzeppelin-contracts/lib/halmos-cheatcodes/src/\",\":openzeppelin-contracts/=lib/openzeppelin-contracts/\"]},\"sources\":{\"lib/openzeppelin-contracts/contracts/interfaces/IERC1363.sol\":{\"keccak256\":\"0x9b6b3e7803bc5f2f8cd7ad57db8ac1def61a9930a5a3107df4882e028a9605d7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://da62d6be1f5c6edf577f0cb45666a8aa9c2086a4bac87d95d65f02e2f4c36a4b\",\"dweb:/ipfs/QmNkpvBpoCMvX8JwAFNSc5XxJ2q5BXJpL5L1txb4QkqVFF\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC165.sol\":{\"keccak256\":\"0xde7e9fd9aee8d4f40772f96bb3b58836cbc6dfc0227014a061947f8821ea9724\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://11fea9f8bc98949ac6709f0c1699db7430d2948137aa94d5a9e95a91f61a710a\",\"dweb:/ipfs/QmQdfRXxQjwP6yn3DVo1GHPpriKNcFghSPi94Z1oKEFUNS\"]},\"lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol\":{\"keccak256\":\"0xce41876e78d1badc0512229b4d14e4daf83bc1003d7f83978d18e0e56f965b9c\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://a2608291cb038b388d80b79a06b6118a42f7894ff67b7da10ec0dbbf5b2973ba\",\"dweb:/ipfs/QmWohqcBLbcxmA4eGPhZDXe5RYMMEEpFq22nfkaUMvTfw1\"]},\"lib/openzeppelin-contracts/contracts/proxy/Clones.sol\":{\"keccak256\":\"0x7162fa3c6971aa6f0a70160fed018edbb8b1db3af9b034ef3f7c224c3bdb7431\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://f212d25e8f357209838ad7ce8ebc89de79906d9fe580566962e889ecb090e6b4\",\"dweb:/ipfs/QmdbLuLwX24VB1Gdrabke584WyaUkuJSWuDzzuRgqAMFge\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xe06a3f08a987af6ad2e1c1e774405d4fe08f1694b67517438b467cecf0da0ef7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://df6f0c459663c9858b6cba2cda1d14a7d05a985bed6d2de72bd8e78c25ee79db\",\"dweb:/ipfs/QmeTTxZ7qVk9rjEv2R4CpCwdf8UMCcRqDNMvzNxHc3Fnn9\"]},\"lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol\":{\"keccak256\":\"0x982c5cb790ab941d1e04f807120a71709d4c313ba0bfc16006447ffbd27fbbd5\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8150ceb4ac947e8a442b2a9c017e01e880b2be2dd958f1fa9bc405f4c5a86508\",\"dweb:/ipfs/QmbcBmFX66AY6Kbhnd5gx7zpkgqnUafo43XnmayAM7zVdB\"]},\"lib/openzeppelin-contracts/contracts/utils/Create2.sol\":{\"keccak256\":\"0xbb7e8401583d26268ea9103013bcdcd90866a7718bd91105ebd21c9bf11f4f06\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://866a11ad89c93ee918078f7a46ae31e17d89216ce64603f0d34be7ed0a5c520e\",\"dweb:/ipfs/QmW3ckLEJg2v2NzuVLNJFmRuerGSipw6Dzg6ntbmqbAGoC\"]},\"lib/openzeppelin-contracts/contracts/utils/Errors.sol\":{\"keccak256\":\"0x6afa713bfd42cf0f7656efa91201007ac465e42049d7de1d50753a373648c123\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://ba1d02f4847670a1b83dec9f7d37f0b0418d6043447b69f3a29a5f9efc547fcf\",\"dweb:/ipfs/QmQ7iH2keLNUKgq2xSWcRmuBE5eZ3F5whYAkAGzCNNoEWB\"]},\"lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol\":{\"keccak256\":\"0x79796192ec90263f21b464d5bc90b777a525971d3de8232be80d9c4f9fb353b8\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://f6fda447a62815e8064f47eff0dd1cf58d9207ad69b5d32280f8d7ed1d1e4621\",\"dweb:/ipfs/QmfDRc7pxfaXB2Dh9np5Uf29Na3pQ7tafRS684wd3GLjVL\"]},\"src/EscrowFactory.sol\":{\"keccak256\":\"0xf9632b661944fcfdb2882ba56fc493927e38d4883c9a5421dbdee075e67ad366\",\"license\":\"GPL-3.0\",\"urls\":[\"bzz-raw://06149bf265e7bcaf431e5a87a9f628911c550740862637e08dd2e9020de9ff11\",\"dweb:/ipfs/QmQRKhiVo4jgQVTBsYyvqmXBocwMYQSR4QxAh4coEiKq17\"]},\"src/SimpleEscrow.sol\":{\"keccak256\":\"0xb3e5b8e615ac4ef9c659fe92b385e4750981cb2bbcd17d8d9bb52ede45e87f7e\",\"license\":\"GPL-3.0\",\"urls\":[\"bzz-raw://3ca7dd20e17d7b98a97bf2a6d29898100e2bb82685bcbcdd75f038fe575b5fa6\",\"dweb:/ipfs/QmVsvfKXPk2wSBJDZAxzzKG2GDddzUsZ7hbPg5dBBa1Jhz\"]}},\"version\":1}",
  "metadata": {
    "compiler": {
      "version": "0.8.25+commit.b61c2a91"
    },
    "language": "Solidity",
    "output": {
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "type": "error",
          "name": "FailedDeployment"
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
          "type": "error",
          "name": "InsufficientBalance"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "escrowAddress",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "payee",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "payer",
              "type": "address",
              "indexed": true
            },
            {
              "internalType": "address",
              "name": "arbiter",
              "type": "address",
              "indexed": false
            }
          ],
          "type": "event",
          "name": "EscrowCreated",
          "anonymous": false
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
              "name": "arbiter",
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
          "name": "createEscrow",
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
          "name": "escrowImplementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ]
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
        "src/EscrowFactory.sol": "EscrowFactory"
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
      "lib/openzeppelin-contracts/contracts/proxy/Clones.sol": {
        "keccak256": "0x7162fa3c6971aa6f0a70160fed018edbb8b1db3af9b034ef3f7c224c3bdb7431",
        "urls": [
          "bzz-raw://f212d25e8f357209838ad7ce8ebc89de79906d9fe580566962e889ecb090e6b4",
          "dweb:/ipfs/QmdbLuLwX24VB1Gdrabke584WyaUkuJSWuDzzuRgqAMFge"
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
      "lib/openzeppelin-contracts/contracts/utils/Create2.sol": {
        "keccak256": "0xbb7e8401583d26268ea9103013bcdcd90866a7718bd91105ebd21c9bf11f4f06",
        "urls": [
          "bzz-raw://866a11ad89c93ee918078f7a46ae31e17d89216ce64603f0d34be7ed0a5c520e",
          "dweb:/ipfs/QmW3ckLEJg2v2NzuVLNJFmRuerGSipw6Dzg6ntbmqbAGoC"
        ],
        "license": "MIT"
      },
      "lib/openzeppelin-contracts/contracts/utils/Errors.sol": {
        "keccak256": "0x6afa713bfd42cf0f7656efa91201007ac465e42049d7de1d50753a373648c123",
        "urls": [
          "bzz-raw://ba1d02f4847670a1b83dec9f7d37f0b0418d6043447b69f3a29a5f9efc547fcf",
          "dweb:/ipfs/QmQ7iH2keLNUKgq2xSWcRmuBE5eZ3F5whYAkAGzCNNoEWB"
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
      "src/EscrowFactory.sol": {
        "keccak256": "0xf9632b661944fcfdb2882ba56fc493927e38d4883c9a5421dbdee075e67ad366",
        "urls": [
          "bzz-raw://06149bf265e7bcaf431e5a87a9f628911c550740862637e08dd2e9020de9ff11",
          "dweb:/ipfs/QmQRKhiVo4jgQVTBsYyvqmXBocwMYQSR4QxAh4coEiKq17"
        ],
        "license": "GPL-3.0"
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
  "id": 25
} as const;
    export default EscrowFactory
  
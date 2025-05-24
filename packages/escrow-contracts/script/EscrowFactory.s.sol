// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {EscrowFactory} from "../src/EscrowFactory.sol";
import {SimpleEscrow} from "../src/SimpleEscrow.sol";
contract EscrowFactoryScript is Script {
    EscrowFactory public escrowFactory;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        escrowFactory = new EscrowFactory();
        console.log("EscrowFactory deployed at", address(escrowFactory));
        console.log("SimpleEscrow deployed at", address(escrowFactory.escrowImplementation()));
        vm.stopBroadcast();
    }
}

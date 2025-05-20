// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


// Custom Errors
error PaymentDisputed();
error NotAuthorized();
error CannotSettleYet();
error CannotDisputeSettledEscrow();
error NotDisputed();
error NotPayer();
error NotArbiter();
error AlreadyInitialized();

contract SimpleEscrow {
    using SafeERC20 for IERC20;
    address public payee;
    address public payer;
    address public arbiter;
    bool public isDisputed;
    bool public isSettled;
    uint256 public settleTime;
    bool private initialized;
    address public proposedArbiter;

    event Settled(address indexed to, address token, uint256 amount);
    event Refunded(address indexed to, address token, uint256 amount);
    event Disputed(address indexed disputeInitiator);
    event DisputeRemoved(address indexed disputeRemover);
    event DisputeResolved(address indexed resolver, bool settled);
    event PayerSet(address indexed payer);


    modifier onlyArbiter() {
        if (msg.sender != arbiter) {
            revert NotArbiter();
        }
        _;
    }

    modifier onlyPayer() {
        if (msg.sender != payer) {
            revert NotPayer();
        }
        _;
    }

    modifier onlyPayee() {
        if (msg.sender != payee) {
            revert NotAuthorized(); 
        }
        _;
    }   

    // function initialize(address _payee, address _payer, address _arbiter, uint256 settleDeadline, address _paymentToken, uint256 _paymentAmount) external {
    function initialize(address _payee, address _payer, address _arbiter, uint256 settleDeadline) external {
        if (initialized) {
            revert AlreadyInitialized();
        }
        payee = _payee;
        arbiter = _arbiter;
        payer = _payer;
        settleTime = block.timestamp + settleDeadline;
        // paymentToken = _paymentToken;
        // paymentAmount = _paymentAmount;
        initialized = true;

        // The tokens must be approved for transfer by the payer
        // IERC20(paymentToken).safeTransferFrom(msg.sender, address(this), paymentAmount);
    }

    receive() external payable {}

    function settle(address token, uint256 amount) external {
        if (isDisputed) {
            revert PaymentDisputed();
        }
        if (msg.sender != payer && msg.sender != payee) {
            revert NotAuthorized();
        }
        
        if (msg.sender == payer) {
            isSettled = true;
        } else if (msg.sender == payee) {
            if (!(isSettled || block.timestamp >= settleTime)) { // Both must be false to block
                revert CannotSettleYet();                       // If payer has settled OR settleTime has passed, proceed
            }
        }

        _transferPayment(payee, token, amount);
        emit Settled(payee, token, amount);
    }

    function refund(address token, uint256 amount) external onlyPayee {
        _transferPayment(payer, token, amount);
        emit Refunded(payer, token, amount);
    }

    function dispute() external onlyPayer {
        if (isSettled) {
            revert CannotDisputeSettledEscrow();
        }
        isDisputed = true;
        emit Disputed(payer);
    }

    function removeDispute() external onlyPayer {
        if (!isDisputed) {
            revert NotDisputed();
        }
        isDisputed = false;
        emit DisputeRemoved(payer);
    }    
        
    function resolveDispute(bool shouldSettle, address token, uint256 amount) external onlyArbiter {
        if (!isDisputed) {
            revert NotDisputed();
        }
        if (shouldSettle) {
            _transferPayment(payee, token, amount);
            emit Settled(payee, token, amount);
        } else {
            _transferPayment(payer, token, amount);
            emit Refunded(payer, token, amount);
        }
        emit DisputeResolved(msg.sender, shouldSettle);
    }

    function _transferPayment(address to, address token, uint256 amount) private {
        if (token == address(0)) {
            payable(to).transfer(amount);
        } else {
            IERC20(token).safeTransfer(to, amount);
        }
    }
}
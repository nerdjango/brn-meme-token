// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SwapPool is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable DRA;
    IERC20 public immutable BRN =
        IERC20(0x926ecC7687fCFB296E97a2b4501F41A6f5F8C214);

    address public constant deadAddress = address(0xdEaD);

    uint256 public tokensClaimed;

    constructor(address _dra) {
        DRA = IERC20(_dra);
    }

    function getDracarys(uint256 _amount) external {
        require(_amount > 0, "SwapPool: amount must be greater than 0");
        require(
            _amount <= BRN.balanceOf(msg.sender),
            "SwapPool: Insufficient BRN balance"
        );
        require(
            _amount <= BRN.allowance(msg.sender, address(this)),
            "SwapPool: Insufficient BRN balance"
        );
        uint256 draAmount = getDraAmount(_amount);
        require(
            draAmount <= DRA.balanceOf(address(this)),
            "SwapPool: Insufficient DRA balance in pool"
        );
        BRN.safeTransferFrom(msg.sender, deadAddress, _amount);
        DRA.safeTransfer(msg.sender, draAmount);
        tokensClaimed += draAmount;
    }

    function getDraAmount(uint256 _amount) public pure returns (uint256) {
        return (_amount * 1000000) - (_amount * 100 * 5);
    }

    function withdraw(uint256 _amount) external onlyOwner {
        require(
            _amount <= DRA.balanceOf(address(this)),
            "SwapPool: Insufficient DRA balance in pool"
        );
        DRA.safeTransfer(msg.sender, _amount);
    }

    function getBurnedTokens() external view returns (uint256) {
        return BRN.balanceOf(deadAddress);
    }
}

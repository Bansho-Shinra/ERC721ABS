// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./ERC721ABS.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract Factory is AccessControlEnumerable {
    uint256 private _price = 0.005 ether;
    bytes32 public constant DEPLOYER = keccak256("DEPLOYER");
    address private _implementation;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(DEPLOYER, _msgSender());
        _implementation = address(new ERC721ABS());
    }

    function deploy(string calldata name, string calldata symbol, address royalty)
        external
        payable
        returns (address)
    {
        require(msg.value == price(), "Price is invalid");
        address clone = Clones.clone(_implementation);
        ERC721ABS(clone).initialize(name, symbol, msg.sender, royalty);
        emit Deploy(name, symbol, clone, msg.sender);
        return clone;
    }

    function withdraw() public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "needs admin role");
        address payable receiver = payable(_msgSender());
        emit Withdraw(address(this).balance);
        receiver.transfer(address(this).balance);
    }

    function price() public view returns (uint256) {
        if (hasRole(DEPLOYER, _msgSender())) return 0;
        else return _price;
    }

    function setPrice(uint256 price_) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "needs admin role");
        _price = price_;
    }

    event Deploy(
        string name,
        string symbol,
        address implementation,
        address owner
    );
    event Withdraw(uint256 amount_);
}

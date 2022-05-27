// SPDX-License-Identifier: MIT
// ERC721A Contracts v4.0.0
// Creators: Chiru Labs

pragma solidity ^0.8.4;

import './ERC721A.sol';
import './IERC721A.sol';
import './mocks/ERC721AQueryableStartTokenIdMock.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


interface ICustomURI {
    function tokenURI(uint256) external view returns (string memory);
}

contract ERC721ABS is  ERC721AQueryableStartTokenIdMock, AccessControlEnumerable, ERC2981, Ownable {
    using Strings for uint256;
    bool private _initialized;
    string private _base;
    address private _customURI;

    constructor() ERC721AQueryableStartTokenIdMock("", "", 0){
    }

    function initialize(string memory name_, string memory symbol_, address owner_, address royalty_) public {
        require(_initialized == false, "Already initialized");
        _name = name_;
        _symbol = symbol_;
        _currentIndex = 1;
        _setupRole(DEFAULT_ADMIN_ROLE, owner_);
        _transferOwnership(owner_);
        _setDefaultRoyalty(royalty_, 1000);
        _initialized = true;
    }

    function mint(address to, uint256 quantity) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "only Admin"
        );
        _safeMint(to, quantity);
    }

    function tokenURI(uint256 tokenId_) 
        public
        view override (IERC721A, ERC721A)
        returns (string memory)
    {
        require(_exists(tokenId_), "nonexistent token");

        return
            (_customURI == address(0x0))?
            string(
                abi.encodePacked(_baseURI(), "/", tokenId_.toString(), ".json")
            ):ICustomURI(_customURI).tokenURI(tokenId_);
    }

    function _baseURI()
        internal view override returns (string memory) {
        return _base;
    }

    function setBaseURI(string memory baseURI_) public {
        require(
            (hasRole(DEFAULT_ADMIN_ROLE, _msgSender())),
            "Admin can add BaseURI"
        );
        _base = baseURI_;
    }

    function setCustomURI(address customURI_) public {
        require(
            (hasRole(DEFAULT_ADMIN_ROLE, _msgSender())),
            "Admin can add BaseURI"
        );
        _customURI = customURI_;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721A, IERC721A, ERC2981, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

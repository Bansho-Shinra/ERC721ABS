// SPDX-License-Identifier: MIT
// ERC721A Contracts v4.0.0
// Creators: Chiru Labs

pragma solidity ^0.8.4;

import './extensions/ERC721AQueryable.sol';
import './mocks/StartTokenIdHelper.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControlEnumerable.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

interface ICustomURI {
    function tokenURI(uint256) external view returns (string memory);
}

contract ERC721ABS is StartTokenIdHelper, ERC721AQueryable, AccessControlEnumerable, ERC2981, Ownable {
    using Strings for uint256;
    bool private _initialized;
    string private _base;
    address private _customURI;

    constructor() StartTokenIdHelper(0) ERC721A('', '') {}

    function initialize(
        string memory name_,
        string memory symbol_,
        address owner_,
        address royalty_,
        string memory baseURI_
    ) public {
        require(_initialized == false, 'Already initialized');
        _name = name_;
        _symbol = symbol_;
        _currentIndex = 1;
        startTokenId = 1;
        _setupRole(DEFAULT_ADMIN_ROLE, owner_);
        _transferOwnership(owner_);
        _setDefaultRoyalty(royalty_, 1000);
        _base = baseURI_;
        _initialized = true;
    }

    function mint(address to, uint256 quantity) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), 'only Admin');
        _safeMint(to, quantity);
    }

    function tokenURI(uint256 tokenId_) public view override(IERC721A, ERC721A) returns (string memory) {
        require(_exists(tokenId_), 'nonexistent token');

        return
            (_customURI == address(0x0))
                ? string(abi.encodePacked(_baseURI(), '/', tokenId_.toString(), '.json'))
                : ICustomURI(_customURI).tokenURI(tokenId_);
    }

    function _baseURI() internal view override returns (string memory) {
        return _base;
    }

    function setBaseURI(string memory baseURI_) public {
        require((hasRole(DEFAULT_ADMIN_ROLE, _msgSender())), 'Admin can add BaseURI');
        _base = baseURI_;
    }

    function setCustomURI(address customURI_) public {
        require((hasRole(DEFAULT_ADMIN_ROLE, _msgSender())), 'Admin can add BaseURI');
        _customURI = customURI_;
    }

    function _startTokenId() internal view override returns (uint256) {
        return startTokenId;
    }

    function nextTokenId() public view returns (uint256) {
        return _nextTokenId();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC721A, ERC721A, ERC2981, AccessControlEnumerable)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981).interfaceId ||
            interfaceId == type(IAccessControlEnumerable).interfaceId ||
            interfaceId == 0x01ffc9a7 || // ERC165 interface ID for ERC165.
            interfaceId == 0x80ac58cd || // ERC165 interface ID for ERC721.
            interfaceId == 0x5b5e139f; // ERC165 interface ID for ERC721Metadata.;
    }
}

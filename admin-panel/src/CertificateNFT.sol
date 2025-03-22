// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CertificateNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public admin;
    mapping(string => bool) private existingHashes;

    constructor() ERC721("CertificateNFT", "CNFT") {
        admin = msg.sender; // Set the deployer as admin
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    function mintCertificate(address recipient, string memory tokenURI) public returns (uint256) {
        require(!existingHashes[tokenURI], "Certificate already exists"); // Prevent duplicates
        existingHashes[tokenURI] = true;

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI); // Now works with ERC721URIStorage

        return newItemId;
    }

    function revokeCertificate(uint256 tokenId) public onlyAdmin {
        _burn(tokenId);
    }
}

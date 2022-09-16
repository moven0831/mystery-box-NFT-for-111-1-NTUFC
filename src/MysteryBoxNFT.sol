// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.3/utils/Counters.sol";


contract NTUFintechClubExpoNFT111_1 is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    bool public revealed = false;
    uint8 public maxSupply = 200;

    string private notRevealedURI = "";
    string private baseURI = "";

    constructor(string memory _notRevealedURI, string memory _baseURI) ERC721("NTUFintechClubExpoNFT111-1", "NTUFC-EXPO-111") {
        // https://gateway.pinata.cloud/ipfs/QmR8FizTQTayDHSxHYkFEzaWXhJm2kNL74r5skayZojcYR
        // https://ipfs.moralis.io:2053/ipfs/Qma2AY1NNAxywYn8CP6Kapibchxhbfz2PnUNHJxq4A7HFS/111-1NTUFC/EXPO/images/mysteryBox/metadata/mysteryBox
        // https://ipfs.moralis.io:2053/ipfs/QmaHnLTCKuSjkUdhWi4TMYm52t3FnD5WfEkJsbjMJbyYnE
        notRevealedURI = _notRevealedURI;
        // https://gateway.pinata.cloud/ipfs/QmZq9e87AHiWLq9J6fF3cVd7kgFwtvgkHndsXhYnGGxQfx/
        // https://ipfs.moralis.io:2053/ipfs/Qme1cMxpjy8gJtdb65yqwut9hZhTZDSp49Teb3HtrLnQw1/111-1NTUFC/EXPO/metadata/
        // https://ipfs.moralis.io:2053/ipfs/QmPnDuxFFgHT9suoKmtHf5ygRCwW3cb5satYXSofCNLxBh/
        baseURI = _baseURI;
    }
   
    function airdropNFT(address to) external payable onlyOwner {
        require(_tokenIdCounter.current() <= maxSupply, "Exceed max supply of NFT");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function switchRevealed() external onlyOwner {
        revealed = !revealed;   
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        if (!revealed) {
            return notRevealedURI;
        }

        return bytes(baseURI).length > 0 
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) 
            : "";
    }
}
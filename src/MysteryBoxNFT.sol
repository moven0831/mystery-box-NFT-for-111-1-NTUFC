// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.3/utils/Counters.sol";


contract KryptoCampBlindBoxNft is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    // 盲盒
    bool private revealed = false;
    uint256 public mintPrice = 3000 wei;
    uint8 public maxMint = 4;

    // 未解盲 json
    string private notRevealedURI = "";
    // 解盲 json
    string private baseURI = "";

    constructor(string memory _notRevealedURI, string memory _baseURI) ERC721("KryptoCampBlindBoxNft", "KC") {
        // https://gateway.pinata.cloud/ipfs/QmR8FizTQTayDHSxHYkFEzaWXhJm2kNL74r5skayZojcYR
        notRevealedURI = _notRevealedURI;
        // https://gateway.pinata.cloud/ipfs/QmZq9e87AHiWLq9J6fF3cVd7kgFwtvgkHndsXhYnGGxQfx/
        baseURI = _baseURI;
    }
    
    function safeMint(address to) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function mintNFT() public payable {
        require(msg.value >= mintPrice, "Insufficeient balance!");
        require(_tokenIdCounter.current() <= maxMint, "only sale 5 nft!! sorry");

        safeMint(msg.sender);
    }

    // 切換盲盒開關
    function switchRevealed(bool _status) external onlyOwner {
        revealed = _status;   
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        // 若 revealed 是 false，tokenURI 設定尚未開盲盒的 json
        if (!revealed) {
            return notRevealedURI;
        }

        return bytes(baseURI).length > 0 
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) 
            : "";
    }
}
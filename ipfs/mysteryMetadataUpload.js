require("dotenv").config();

let fs = require("fs");
let axios = require("axios");
let ipfsArray = [];
let promises = [];

let imageAmount = 200;
let imageIpfsID = 'QmPB3wHqRsmWw4Nk7z1hFpK1MM5i62PH3DyN2MMKwUxoHE';
let imageIpfsDirPath = '111-1NTUFC/EXPO/images/mysteryBox';

const zeroPad = (num, places) => String(num).padStart(places, '0');

ipfsArray.push({
    path: `${imageIpfsDirPath}/metadata/mysteryBox`,
    content: {
        image: `ipfs://${imageIpfsID}/${imageIpfsDirPath}`,
        name: `[Test 2] 111-1 NTUFC EXPO Mystert Box`,
        description: "presented on 09162022"
    }
})
axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", 
    ipfsArray,
    {
        headers: {
            "X-API-KEY": process.env["MORALIS_API_KEY"],
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }
).then( (res) => {
    console.log(res.data);
})
.catch ( (error) => {
    console.log(error)
})

// https://ipfs.moralis.io:2053/ipfs/QmPB3wHqRsmWw4Nk7z1hFpK1MM5i62PH3DyN2MMKwUxoHE/111-1NTUFC/EXPO/images/mysteryBox

// JSON Response
// https://ipfs.moralis.io:2053/ipfs/Qma2AY1NNAxywYn8CP6Kapibchxhbfz2PnUNHJxq4A7HFS/111-1NTUFC/EXPO/images/mysteryBox/metadata/mysteryBox
// {"image":"ipfs://QmPB3wHqRsmWw4Nk7z1hFpK1MM5i62PH3DyN2MMKwUxoHE/111-1NTUFC/EXPO/images/mysteryBox","name":"[Test 2] 111-1 NTUFC EXPO Mystert Box","description":"presented on 09162022"}
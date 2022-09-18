require("dotenv").config();

let fs = require("fs");
let axios = require("axios");
let ipfsArray = [];
let promises = [];

let imageIpfsID = 'QmdQqQoUViNMpAVp7smYJjeZ7Jz691W5Ph7vegXes4oVmJ';
// let imageIpfsDirPath = '111-1NTUFC/EXPO/images/mysteryBox';

const zeroPad = (num, places) => String(num).padStart(places, '0');

ipfsArray.push({
    path: `metadata/mysteryBox`,
    content: {
        image: `ipfs://${imageIpfsID}`,
        name: `[NTU EXPO 111] NTUFC Mystery Box`,
        description: "Mystery Box made by NTUFC. Check out what's inside on Sep 20 2022",
        external_url: "https://www.facebook.com/NTUFRC",
        attributes: [
            {
                "trait_type": "Club", 
                "value": "NTU FinTech Club"
            },
            {
                "trait_type": "Unbox Date", 
                "value": "Sep 20 2022"
            },
            {
              "display_type": "boost_percentage", 
              "trait_type": "GPA Boost", 
              "value": 15
            }
          ]
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
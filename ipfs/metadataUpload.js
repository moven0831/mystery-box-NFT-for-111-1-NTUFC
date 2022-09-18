require("dotenv").config();

let fs = require("fs");
let axios = require("axios");
let ipfsArray = [];
let promises = [];

let imageAmount = 100;
let imageIpfsID = 'QmWLg56ZDbgV16QDWySqxLJJan7m2qn3zXZmnCet5xuFBM';
// let imageIpfsDirPath = '111-1NTUFC/EXPO';

const zeroPad = (num, places) => String(num).padStart(places, '0');

for (let i = 0; i < imageAmount; i++) {
    ipfsArray.push({
        path: `${i}.json`,
        content: {
            image: `ipfs://${imageIpfsID}/${i}.jpg`,
            name: `[NTU EXPO 111] NTUFC POAP #${i}`,
            description: "Proof of attendance for 111-1 NTUFC EXPO. Also can be used as a voucher for discounts or gifts.",
            external_url: "https://www.facebook.com/NTUFRC",
            attributes: [
                {
                    "trait_type": "Club", 
                    "value": "NTU FinTech Club"
                },
                {
                  "display_type": "boost_percentage", 
                  "trait_type": "GPA Boost", 
                  "value": 100
                }, 
                {
                  "display_type": "number", 
                  "trait_type": "Generation of NTUFC", 
                  "value": 4
                }
              ]
        }
    })
}
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

// https://ipfs.moralis.io:2053/ipfs/QmWPwd4qbKtL4VJLyJiZpS3jk64bvRPTB3wcGJF8XTRf8x/111-1NTUFC/EXPO/images/102.jpg

// JSON Response
// https://ipfs.moralis.io:2053/ipfs/Qme1cMxpjy8gJtdb65yqwut9hZhTZDSp49Teb3HtrLnQw1/111-1NTUFC/EXPO/metadata/99.json
// {"image":"ipfs://QmWPwd4qbKtL4VJLyJiZpS3jk64bvRPTB3wcGJF8XTRf8x/111-1NTUFC/EXPO/images/99.jpg","name":"[Test 1] 111-1NTUFC EXPO NFT #99","description":"presented on 09162022"}

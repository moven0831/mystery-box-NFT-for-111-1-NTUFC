require("dotenv").config();

let fs = require("fs");
let axios = require("axios");
let ipfsArray = [];
let promises = [];

let imageAmount = 200;
let imageIpfsID = 'QmWPwd4qbKtL4VJLyJiZpS3jk64bvRPTB3wcGJF8XTRf8x';
let imageIpfsDirPath = '111-1NTUFC/EXPO';

const zeroPad = (num, places) => String(num).padStart(places, '0');

for (let i = 0; i < imageAmount; i++) {
    ipfsArray.push({
        path: `${imageIpfsDirPath}/metadata/${i}.json`,
        content: {
            image: `ipfs://${imageIpfsID}/${imageIpfsDirPath}/images/${i}.jpg`,
            name: `[Test 1] 111-1NTUFC EXPO NFT #${i}`,
            description: "presented on 09162022"
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

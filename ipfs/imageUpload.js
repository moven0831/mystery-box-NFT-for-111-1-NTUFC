require("dotenv").config();

let fs = require("fs");
let axios = require("axios");
let ipfsArray = [];
let promises = [];

let imageAmount = 100;
let imageDirPath = 'imageDB';
// let ipfsDirPath = '111-1NTUFC/EXPO/images';

const zeroPad = (num, places) => String(num).padStart(places, '0');

for (let i = 0; i < imageAmount; i++) {    
    promises.push(new Promise((res, rej) => {
        fs.readFile(`${__dirname}/${imageDirPath}/${i}.jpg`, (err, data) => {
            if(err) rej();
            ipfsArray.push({
                path: `${i}.jpg`,
                content: data.toString("base64")
            })
            res();
        })
    }))
}

Promise.all(promises).then( () => {
    axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", 
        ipfsArray,
        {
            headers: {
                "X-API-KEY": process.env["MORALIS_API_KEY"],
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        },
    ).then( (res) => {
        console.log(res.data);
    })
    .catch ( (error) => {
        console.log(error)
    })
})

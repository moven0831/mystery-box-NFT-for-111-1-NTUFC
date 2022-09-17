require("dotenv").config();

let fs = require("fs");
let axios = require("axios");
let ipfsArray = [];
let promises = [];

let imageDirPath = 'imageToCut';
let mysteryBox = 'Mystery_Box';
// let ipfsDirPath = '111-1NTUFC/EXPO/images/mysteryBox';

const zeroPad = (num, places) => String(num).padStart(places, '0');


promises.push(new Promise((res, rej) => {
    fs.readFile(`${__dirname}/${imageDirPath}/${mysteryBox}.jpg`, (err, data) => {
        if(err) rej();
        ipfsArray.push({
            path: "mystery_box.jpg",
            content: data.toString("base64")
        })
        res();
    })
}))

Promise.all(promises).then( () => {
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
})

// https://ipfs.moralis.io:2053/ipfs/QmPB3wHqRsmWw4Nk7z1hFpK1MM5i62PH3DyN2MMKwUxoHE/111-1NTUFC/EXPO/images/mysteryBox
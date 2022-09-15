const fs = require('fs');

const toDirPath = 'imageDB';
const fromDirPath = 'imageToCut';
const sourcePrefix = 'test_';
const sourceAmount = 3;
const limit = [192, 5, 3];
const genAmount = 200;

let curLimit = [0, 0, 0];
let random;

Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});

function calculateProb(idx) {
    return parseFloat((Math.round(limit[idx] / genAmount * 1000) / 1000).toFixed(3));
}

function getAllIndexes(arr, val) {
    let indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function randomChoice(p) {
    let rnd = p.reduce( (a, b) => a + b ) * Math.random();
    return p.findIndex( a => (rnd -= a) < 0 );
}

function randomChoices(p, count) {
    return Array.from(Array(count), randomChoice.bind(null, p));
}

const probs = [
    calculateProb(0),
    calculateProb(1),
    calculateProb(2)];

let randomResult = [0, 0, 0];

// make sure there's only exact amount of limit[1] & limit[2]
while (randomResult.count(1) != limit[1] || randomResult.count(2) != limit[2]) {
    randomResult = randomChoices([
        calculateProb(0),
        calculateProb(1),
        calculateProb(2)
    ], 
    genAmount);
}

// console.dir(randomResult, {depth: null, colors: true, maxArrayLength: null});

for (let i = 0; i < genAmount; i++) {
    // File copy
    fs.copyFile(`${fromDirPath}/${sourcePrefix}${randomResult[i]}.jpg`, `${toDirPath}/${i}.jpg`, (err) => {
        if (err) throw err;
        // console.log(`${sourcePrefix}${randomResult[i]} was copied to ${toDirPath}/${i}.jpg`);
    });
}

// Show idx of rare image
console.log('\nCopy Completed');
console.log(`Total supply ${limit[1]}'s idxs: ` + getAllIndexes(randomResult, 1));
console.log(`Total supply ${limit[2]}'s idxs: ` + getAllIndexes(randomResult, 2));

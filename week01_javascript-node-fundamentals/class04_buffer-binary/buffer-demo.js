/* eslint no-console: off */
const { readFile, writeFile } = require('fs');

const getChar = char => char.charCodeAt(0);

const charB = getChar('B');
const charb = getChar('b');
const charF = getChar('F');
const charf = getChar('f');

readFile('README.md', (err, buffer) => {
    if(err) return console.log(err);

    // #1 loop thru the bytes
    for(let i = 0; i < buffer.length ; i++) {
        // #2 If the ascii value is b or f, replace with B F
        const ascii = buffer.readInt8(i);
        if(ascii === charb) buffer.writeInt8(charB, i);
        if(ascii === charf) buffer.writeInt8(charF, i);
    }

    // #3 write out a new file
    writeFile('eff-n-readme.md', buffer, err => {
        console.log(err ? err.message : 'done');
    });
});

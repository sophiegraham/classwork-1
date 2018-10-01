/* eslint no-console: off */
const { readFile, writeFile } = require('fs');
const LetterReader = require('./eff-n-reader');

const getChar = char => char.charCodeAt(0);

const charB = getChar('B');
const charb = getChar('b');
const charF = getChar('F');
const charf = getChar('f');

readFile('README.md', (err, buffer) => {
    if(err) return console.log(err);

    const reader = new LetterReader(['f', 'b']);
    
    // fires whenever it finds the letter we config in the constructor
    reader.on('letter', letter => {
        const { value, offset } = letter;
        if(value === charf) buffer.writeInt8(charF, offset);
        if(value === charb) buffer.writeInt8(charB, offset);
    });

    reader.on('end', () => {
        // #3 write out a new file
        writeFile('eff-n-ee-readme.md', buffer, err => {
            console.log(err ? err.message : 'done');
        });
    });

    reader.read(buffer);
});


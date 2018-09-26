/* eslint no-console: off */
const fs = require('fs');

const files = fs.readdirSync('test');
console.log(files);

fs.readdir('test', (err, done) => {});

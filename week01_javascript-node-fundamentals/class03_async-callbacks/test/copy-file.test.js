const assert = require('assert');
const fs = require('fs');
const path = require('path');
const copyFile = require('../lib/copy-file');

describe('copy file', () => {

    const sourcePath = path.join(__dirname, 'file-to-copy.txt');
    const destFile = 'copied-file.txt';
    const destPath = path.join(__dirname, 'copy-file-dir', destFile);

    beforeEach(done => {
        fs.unlink(destPath, err => {
            if(err && err.code !== 'ENOENT') done(err);
            else done();
        });
    });

    it('copies from source to destination', done => {
        copyFile(sourcePath, destPath, err => {
            if(err) return done(err);

            const sourceContents = fs.readFileSync(sourcePath, 'utf8');
            const destContents = fs.readFileSync(destPath, 'utf8');
            assert.equal(sourceContents, destContents);
            done();
        });
    });

});

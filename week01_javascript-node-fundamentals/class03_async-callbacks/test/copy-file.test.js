const assert = require('assert');
const fs = require('fs');
const path = require('path');

function copyFile(source, dest, callback) {
    // #1 read the file
    fs.readFile(source, (err, contents) => {
        if(err) return callback(err);

        // #2 write the file

        // Way #1 - very explicit, separate invocation of callback
        // for error and success conditions:
        //
        // fs.writeFile(dest, contents, err => {
        //     if(err) callback(err);
        //     else callback();
        // });

        // Way #2 - pass-thru: forward value of 
        // err (error or null) to our callback:
        //
        fs.writeFile(dest, contents, err => {
            callback(err);
        });

        // Way #3 - Use the callback we got as 
        // callback for writeFile:
        //
        // fs.writeFile(dest, contents, callback);

    });
}

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

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const copyFile = require('./copy-file');

function copyDir(source, dest, callback) {
    // #1 make sure dest exists
    mkdirp(dest, err => {
        if(err) return callback(err);
        // #2 read files
        fs.readdir(source, (err, files) => {
            if(err) return callback(err);

            let count = files.length;

            // #3 copy each file
            files.forEach(file => {
                const sourcePath = path.join(source, file);
                const destPath = path.join(dest, file);
                copyFile(sourcePath, destPath, err => {
                    if(err) return callback(err);

                    count--;
                    if(count === 0) callback();
                });
            });
        });


    });
}

module.exports = copyDir;

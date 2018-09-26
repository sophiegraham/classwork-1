const fs = require('fs');

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

module.exports = copyFile;

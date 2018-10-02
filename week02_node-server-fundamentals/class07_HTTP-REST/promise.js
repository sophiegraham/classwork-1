const fs = require('fs');

const fileReader = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, file) => {
            if(err) {
                reject(err);
            } else {
                resolve(file);
            }
        });
    });
};

// fs.readFile('./README.md', 'utf8', (err, file) => {
//     if(err) return console.error(err);

//     console.log(file);
// });

fileReader('./README.md')
    .then(file => {
        console.log(file);
        return 1;
    })
    .then(one => console.log(one))
    .catch(err => {
        console.error(err);
    });

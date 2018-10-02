
module.exports = function bodyParser(req) {
    return new Promise((resolve, reject) => {
        if(req.header['content-type'] !== 'application/json') {
            return reject('we need json');
        }

        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            const json = JSON.parse(data);
            resolve(json);
        });

        req.on('error', err => {
            reject(err);
        });
    });
};

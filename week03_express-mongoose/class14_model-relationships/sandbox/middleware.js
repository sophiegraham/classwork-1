module.exports = (showPath) => {
    return (req, res, next) => {
        let path = '';
        if(showPath) {
            path = req.path;
        }

        new Promise((resolve, reject) => {
            setTimeout(() => {
                req.testing = '1234';
                resolve();
                next();
            }, 1000);

            console.log(`${req.method} ${path}`);
        });
    };
};

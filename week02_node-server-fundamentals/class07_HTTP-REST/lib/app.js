const { parse } = require('url');
const bodyParser = require('./body-parser');

const numbers = [1, 2, 3, 4, 5];

module.exports = (req, res) => {
    // use node's built in url parser
    const url = parse(req.url, true);     
    const parts = url.pathname.split('/').slice(1);
};

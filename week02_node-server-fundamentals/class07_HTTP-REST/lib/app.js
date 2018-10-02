const { parse } = require('url');
const bodyParser = require('./body-parser');

module.exports = (req, res) => {
    // use node's built in url parser
    const url = parse(req.url, true);  
    // ['happy-birthday', '<name>']
    const parts = url.pathname.split('/').slice(1);

    if(parts[0] === 'hello') {
        res.end('hi there');
    } else if(req.method === 'GET') {
        res.end('hello world');
    }
};

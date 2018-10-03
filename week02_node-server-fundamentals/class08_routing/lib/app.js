const { parse } = require('url');
const bodyParser = require('./body-parser');
const Tweets = require('./models/Tweets');

module.exports = (req, res) => {
    const url = parse(req.url);
    const parts = url.pathname.split('/').slice(1);

    res.setHeader('Content-Type', 'application/json');

    bodyParser(req).then(body => {
        if(req.method === 'GET' && parts[0] === 'tweets' && parts[1]) {
            const id = parts[1];
            const tweet = Tweets.get(id);
            res.end(JSON.stringify(tweet));
        } else if(req.method === 'GET' && parts[0] === 'tweets') {
            const tweets = Tweets.getAll();
            res.end(JSON.stringify(tweets));
        } else if(req.method === 'POST' && parts[0] === 'tweets') {
            const { username, text } = body;
            const tweet = Tweets.create(username, text);
            res.end(JSON.stringify(tweet));
        }
    });
};

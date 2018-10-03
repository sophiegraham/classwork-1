const Tweets = require('../models/Tweets');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        const tweet = Tweets.get(id);
        res.send(tweet);
        //res.end(JSON.stringify(tweet));
    } else {
        const tweets = Tweets.getAll();
        res.send(tweets);
        //res.end(JSON.stringify(tweets));
    }
};

const post = (req, res) => {
    const { username, text } = req.body;
    const tweet = Tweets.create(username, text);
    res.send(tweet);
    //res.end(JSON.stringify(tweet));
};

const methods = {
    get,
    post
};

module.exports = (req, res) => {
    // GET -> get
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};

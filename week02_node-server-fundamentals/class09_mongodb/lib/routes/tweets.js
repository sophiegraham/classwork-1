const Tweets = require('../models/Tweets');
const notFound = require('./not-found');

const get = (req, res) => {
    const { id } = req;
    if(id) {
        Tweets.get(id).then(res.send);
    } else {
        Tweets.getAll().then(res.send);
    }
};

const post = (req, res) => {
    const { username, text } = req.body;
    Tweets.create(username, text).then(res.send);
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

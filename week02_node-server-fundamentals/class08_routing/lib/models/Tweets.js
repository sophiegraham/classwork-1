const Tweet = require('./Tweet');

class Tweets {
    constructor() {
        this.tweets = new Map();
    }

    create(username, text) {
        const tweet = new Tweet(username, text);
        this.tweets.set(tweet.id, tweet);
        return tweet;
    }

    get(id) {
        return this.tweets.get(id);
    }

    getAll() {
        return [...this.tweets.values()];
    }

    update(id, newText) {
        const tweet = this.tweets.get(id);
        tweet.text = newText;
        return tweet;
    }

    delete(id) {
        this.tweets.delete(id);
    }
};

module.exports = new Tweets();

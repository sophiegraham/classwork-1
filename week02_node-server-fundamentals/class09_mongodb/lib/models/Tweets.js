const db = require('../mongo-connector');
const { ObjectId } = require('mongodb')

class Tweets {
    constructor() {
        this.tweets = new Map();
    }

    create(username, text) {
        return db('tweets')
            .then(collection => {
                return collection.insertOne({
                    username,
                    text
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('tweets')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }

    getAll() {
        return db('tweets')
            .then(collection => {
                return collection.find();
            })
            .then(tweetsDocObject => tweetsDocObject.toArray());
    }

    drop() {
        return db('tweets').then(collection => collection.deleteMany());
    }

    // get(id) {
    //     return this.tweets.get(id);
    // }

    // getAll() {
    //     return [...this.tweets.values()];
    // }

    // update(id, newText) {
    //     const tweet = this.tweets.get(id);
    //     tweet.text = newText;
    //     return tweet;
    // }

    // delete(id) {
    //     this.tweets.delete(id);
    // }
}

module.exports = new Tweets();

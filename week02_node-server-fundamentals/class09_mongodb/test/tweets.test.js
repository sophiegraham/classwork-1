require('dotenv').config();
const Tweets = require('../lib/models/Tweets');

describe('tweets model', () => {

    let createdTweets;

    beforeEach(() => {
        return Tweets.drop();
    });

    beforeEach(() => {
        return Promise.all([
            Tweets.create('ryan', 'Hello test'),
            Tweets.create('ryan', 'Hello test1'),
            Tweets.create('ryan', 'Hello test2')
        ])
            .then(createdTweetsFromPromise => {
                createdTweets = createdTweetsFromPromise;
            });
    });

    it('creates a new tweet in my db', () => {
        return Tweets.create('ryan', 'Hello test')
            .then(createdTweet => {
                expect(createdTweet).toHaveProperty('_id');
                expect(createdTweet.username).toEqual('ryan');
                expect(createdTweet.text).toEqual('Hello test');
            });
    });

    it('gets a tweet by id', () => {
        return Tweets.get(createdTweets[0]._id)
            .then(receivedTweet => {
                expect(receivedTweet).toEqual(createdTweets[0]);
            });
    });
});

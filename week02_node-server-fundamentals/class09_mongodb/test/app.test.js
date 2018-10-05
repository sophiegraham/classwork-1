require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const Tweets = require('../lib/models/Tweets');

describe('twitter clone', () => {
    const tweets = [
        { username: 'ryan', text: 'my tweet' },
        { username: 'me', text: 'my other tweet' }
    ];

    let createdTweets;

    const creator = tweet => {
        return request(app).post('/tweets')
            .send(tweet);
    };

    beforeEach(() => {
        return Tweets.drop();
    });

    beforeEach(() => {
        return Promise.all(tweets.map(creator))
            .then(ts => {
                createdTweets = ts.map(t => t.body);
            });
    });

    it.only('gets all tweets', () => {
        return request(app).get('/tweets').set('Accept', 'application/json').then(res => {
            expect(res.body).toEqual(createdTweets);
        });
    });

    it('create a tweet', () => {
        return request(app).post('/tweets')
            .send({ username: 'me', text: 'my tweet' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    username: 'me',
                    text: 'my tweet'
                });
            });
    });

    it('get a tweet by id', () => {
        return request(app).get(`/tweets/${createdTweets[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdTweets[0]);
            });
    });

    it('returns 404 when there is no method', () => {
        return request(app)
            .patch('/tweets')
            .send({})
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });

    it('returns 404 when there is no route', () => {
        return request(app).get('/quarks').then(res => {
            expect(res.statusCode).toEqual(404);
        });
    });
});

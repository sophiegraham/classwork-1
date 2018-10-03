const request = require('supertest');
const app = require('../lib/app');

describe('twitter clone', () => {
    it('gets all tweets', () => {
        return request(app).get('/tweets').then(res => {
            expect(res.text).toEqual('[]');
        });
    });

    it('create a tweet', () => {
        return request(app).post('/tweets')
            .send({ username: 'me', text: 'my tweet' })
            .then(res => {
                const json = JSON.parse(res.text);
                expect(json.text).toEqual('my tweet');
                expect(json.username).toEqual('me');
                expect(json.id).toEqual(expect.any(String));
            });
    });

    it('get a tweet by id', () => {
        return request(app).post('/tweets')
            .send({ username: 'me', text: 'my tweet' })
            .then(createRes => {
                const { id } = JSON.parse(createRes.text);
                return request(app).get(`/tweets/${id}`);
            })
            .then(getRes => {
                const tweet = JSON.parse(getRes.text);
                expect(tweet.id).toEqual(expect.any(String));
                expect(tweet.username).toEqual(expect.any(String));
                expect(tweet.text).toEqual(expect.any(String));
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

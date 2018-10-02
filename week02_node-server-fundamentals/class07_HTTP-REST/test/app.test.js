const request = require('supertest');

// import our server app
const app = require('../lib/app');

describe('simple http server', () => {
    it('responds with hello world on GET', () => {
        return request(app).get('/').then(res => {
            expect(res.text).toEqual('hello world');
        });
    });

    it('responds with hi there when path is /hello', () => {
        return request(app).get('/hello')
            .then(res => {
                expect(res.text).toEqual('hi there');
            });
    })
});

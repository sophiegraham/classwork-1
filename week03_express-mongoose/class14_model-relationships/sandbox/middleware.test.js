const tesingMiddleware = require('./middleware');

test('that the request has testing after middleware', done => {
    const req = {
        method: 'NOTAREALMETHOD',
        path: '/not/a/path'
    };
    const middleware = tesingMiddleware(false);

    const next = () => {
        expect(req.testing).toEqual('1234');
        done();
    };
    
    middleware(req, null, next);
});

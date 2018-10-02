const { EventEmitter }  = require('events');
const bodyParser = require('../lib/body-parser');

describe('bodyParser', () => {
    it('parses json body', () => {
        let req = new EventEmitter();
        req.header = {};
        req.header['content-type'] = 'application/json';

        const promise = bodyParser(req)
            .then(body => {
                expect(body).toEqual({ name: 'test' });
            });

        // emit after initializing body parser.
        // body parser needs to subscribe to
        // the events first.
        req.emit('data', JSON.stringify({
            name: 'test',
        }));

        req.emit('end');

        return promise;
    });

    it('fails gracefully if not json', () => {
        let req = new EventEmitter();
        req.header = {};
        req.header['content-type'] = 'text/html';

        const promise = bodyParser(req)
            .then(() => {
                expect(false);
            })
            .catch(err => {
                expect(err).toBeTruthy();
            });

        // emit after initializing body parser.
        // body parser needs to subscribe to
        // the events first.
        req.emit('data', '<html></html>');

        req.emit('end');

        return promise;
    });
});

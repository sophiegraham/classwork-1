const { dropCollection } = require('./db');
const request = require('supertest');
const app = require('../../lib/app');
const Chance = require('chance');
const chance = new Chance();

describe('subscriber pub/sub API', () => {
    let subscribers = Array.apply(null, { length: 3 }).map(() => {
        return {
            events: ['purchase'],
            callbacks: []
        };
    });
    let createdSubscribers;

    const createSubscriber = subscriber => {
        return request(app)
            .post('/api/subscribers')
            .send(subscriber)
            .then(res => res.body);
    };

    beforeEach(() => {
        return dropCollection('subscribers');
    });

    beforeEach(() => {
        return Promise.all(subscribers.map(createSubscriber)).then(subscriberRes => {
            createdSubscribers = subscriberRes;
        });
    });

    it('creates an subscriber on post', () => {
        return request(app)
            .post('/api/subscribers')
            .send({
                events: ['purchase']
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    events: ['purchase'],
                    callbacks: []
                });
            });
    });

    it('gets a subscriber by id', () => {
        return request(app)
            .get(`/api/subscribers/${createdSubscribers[0]._id}`)
            .then(res => {
                expect(res.body).toEqual(createdSubscribers[0]);
            });
    });

    it('pushes a new callback to a subscriber by id', () => {
        return request(app)
            .post(`/api/subscribers/${createdSubscribers[0]._id}/callbacks`)
            .send({ callback: 'http://localhost:6789' })
            .then(res => {
                expect(res.body).toEqual({
                    ...createdSubscribers[0],
                    callbacks: ['http://localhost:6789']
                });
            });
    });

    it('pushes a new event type to a subscriber by id', () => {
        return request(app)
            .post(`/api/subscribers/${createdSubscribers[0]._id}/events`)
            .send({ event: 'shipping' })
            .then(res => {
                expect(res.body).toEqual({
                    ...createdSubscribers[0],
                    events: ['purchase', 'shipping']
                });
            });
    });
});

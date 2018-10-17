const router = require('express').Router();
const Subscriber = require('../models/Subscriber');

module.exports = router
    .post('/', (req, res, next) => {
        const { events, callbacks } = req.body;
        Subscriber
            .create({ events, callbacks })
            .then(subscriber =>
                res.json(subscriber.toJSON())
            )
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Subscriber
            .findById(id)
            .lean()
            .then(event => res.json(event))
            .catch(next);
    })

    .post('/:id/callbacks', (req, res, next) => {
        const { id } = req.params;
        const { callback } = req.body;

        Subscriber
            .findByIdAndUpdate(id,
                { $push: { callbacks: callback } },
                { new: true, runValidators: true })
            .lean()
            .then(subscriber => {
                res.json(subscriber);
            })
            .catch(next);
    })

    .post('/:id/events', (req, res, next) => {
        const { id } = req.params;
        const { event } = req.body;

        Subscriber
            .findByIdAndUpdate(id,
                { $push: { events: event } },
                { new: true, runValidators: true })
            .lean()
            .then(subscriber => {
                console.log(subscriber);
                res.json(subscriber);
            })
            .catch(next);
    });

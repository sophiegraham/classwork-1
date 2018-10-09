const router = require('express').Router();
const Events = require('../models/Events');

module.exports = router
    .post('/', (req, res) => {
        const { type, customerId, purchaseId } = req.body;
        Events.create({ type, customerId, purchaseId }).then(event =>
            res.json(event)
        );
    })

    .get('/', (req, res) => {
        Events.getAll().then(events => res.json(events));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Events.get(id).then(event => res.json(event));
    });

const mongoose = require('mongoose');
const EventTypes = require('./EventTypes');

const customerSchema = new mongoose.Schema({
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

const Customer = mongoose.model('Event', customerSchema);

module.exports = Customer;

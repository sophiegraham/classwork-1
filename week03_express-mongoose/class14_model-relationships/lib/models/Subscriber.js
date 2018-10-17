const mongoose = require('mongoose');
const EventTypes = require('./EventTypes');

const subscriberSchema = new mongoose.Schema({
    events: [{
        type: String,
        enum: EventTypes,
        required: true
    }],
    callbacks: [String]
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;

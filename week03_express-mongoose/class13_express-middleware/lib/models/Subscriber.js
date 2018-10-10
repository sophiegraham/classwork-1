const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['purchase', 'shipped', 'returned', 'complete'],
        required: true
    },
    callbacks: {
        type: [String],
        default: []
    }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;

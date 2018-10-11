const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['purchase', 'shipped', 'returned', 'complete'],
        required: true
    },
    purchaseId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

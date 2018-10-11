const mongoose = require('mongoose');
const EventTypes = require('./EventTypes');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: EventTypes,
        required: true
    },
    purchaseId: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

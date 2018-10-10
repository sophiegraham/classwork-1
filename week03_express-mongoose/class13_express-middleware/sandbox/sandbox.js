const mongoose = require('mongoose');

const connect = require('../lib/util/connect');
connect('mongodb://172.17.0.2:27017/events_test');
const Event = require('../lib/models/Event');

Event.find()
    .count()
    .then(console.log)
    .catch(console.error)
    .finally(() => mongoose.disconnect());

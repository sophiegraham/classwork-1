const connect = require('../../lib/util/connect');
connect('mongodb://172.17.0.2:27017/class');
const mongoose = require('mongoose');

afterAll(() => {
    return mongoose.disconnect();
});

module.exports = collection => {
    mongoose.connection.dropCollection(collection).catch(() => { });
};

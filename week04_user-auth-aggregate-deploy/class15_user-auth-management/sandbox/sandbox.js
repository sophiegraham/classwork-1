const mongoose = require('mongoose');
require('../lib/util/connect')('mongodb://172.17.0.2:27017/user_bad');

const User = require('../lib/models/User');
const Chance = require('chance');
const chance = new Chance();


const passwords = ['test1234', 'password', 'testing'];

const creatUsers = Array.apply(null, { length: 100 }).map((_, i) => {
    return User.create({
        name: chance.name(),
        email: chance.email(),
        clearPassword: passwords[i % 3]
    });
});

Promise.all(creatUsers)
    .finally(mongoose.disconnect.bind(mongoose));

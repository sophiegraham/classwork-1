/* eslint-disable  no-console */

require('dotenv').config();
const mongoose = require('mongoose');
require('../lib/mongoose-connector')();


const puppySchema = mongoose.Schema({
    leash: Boolean,
    name: String,
    breed: String,
    weight: {
        type: Number,
        min: 0
    },
    birthDay: Date
});

const Puppy = mongoose.model('Puppy', puppySchema);

// Puppy
//     .create({
//         leash: true,
//         name: 'my puppy',
//         breed: 'toy poodle',
//         weight: 30,
//         birthDay: Date.now(),
//     })
//     .then(console.log);

// Puppy.find()
//     .then(puppies => puppies.map(puppy => puppy.toJSON()))
//     .then(console.log);


Puppy
    .create({
        leash: true,
        name: 'my puppy',
        breed: 'toy poodle',
        weight: -100,
        birthDay: Date.now(),
    })
    .then(console.log)
    .then(() => mongoose.disconnect())
    .catch(console.error);

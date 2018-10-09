/* eslint-disable  no-console */

require('dotenv').config();
const mongoose = require('mongoose');
require('../lib/mongoose-connector')();


const puppySchema = mongoose.Schema({
    leash: Boolean,
    name: String,
    breed: String,
    weight: Number,
    birthDay: Date
});

const Puppy = mongoose.model('Puppy', puppySchema);


Puppy.create({
    leash: true,
    name: 'my puppy',
    breed: 'toy poodle',
    weight: 30,
    birthDay: Date.now(),
    gender: ''
}).then(puppy => {
    console.log(puppy);
});

// Puppy.find()
//     .then(console.log);

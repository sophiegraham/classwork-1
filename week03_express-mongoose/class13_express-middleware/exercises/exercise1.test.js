const request = require('supertest');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://172.17.0.2:27017/class', { useNewUrlParser: true }, () => {
    /* eslint-disable-next-line no-console */
    console.log('Connected to mongodb');
});

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Quote = mongoose.model('Quote', quoteSchema);



app.get('/quotes', (req, res) => {
    const { author } = req.query;
    let search = {};
    if(author) {
        search.author = author;
        // { author: 'Walter White' }
    }

    Quote.find(search)
        .select({ __v: false })
        .lean()
        .then(quotes => res.json(quotes));
});

let createdQuotes = [];

beforeAll(() => {
    return Quote.deleteMany();
});

beforeEach(() => {
    return Promise.all(require('./quotes.json')
        .map(q => Quote.create(q)))
        .then(qs => createdQuotes = qs.map(q => q.toJSON({ versionKey: false })));
});

afterAll(() => mongoose.disconnect());

test('test quotes', () => {
    return request(app).get('/quotes').then(res => {
        createdQuotes.forEach(quote => {
            expect(res.body).toContainEqual({ ...quote, _id: quote._id.toString() });
        });
    });
});

test('test search quotes', () => {
    return request(app).get('/quotes?author=Walter White').then(res => {
        createdQuotes
            .filter(quote => quote.author === 'Walter White')
            .forEach(quote => {
                expect(res.body).toContainEqual({ ...quote, _id: quote._id.toString() });
            });
    });
});

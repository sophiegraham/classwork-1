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
    // Write an express route that finds all quotes or all quotes by a 
    // particular author if a author query is provided. Use select()
    // to remove the __v field from the returned value. Use lean() to
    // return plain JavaScript objects
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

test('test search quotes length', () => {
    return request(app).get('/quotes?length=1000').then(res => {
        createdQuotes
            .filter(quote => quote.author === 'Walter White')
            .forEach(quote => {
                expect(res.body).toContainEqual({ ...quote, _id: quote._id.toString() });
            });
    });
});

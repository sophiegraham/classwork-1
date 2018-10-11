const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler } = require('./util/errors');

app.use(morgan('dev', {
    skip() {
        // skip logging on test
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.static('public'));
app.use(express.json());

const events = require('./routes/events');
app.use('/api/events', events);

const subscribers = require('./routes/subscribers');
app.use('/api/subscribers', subscribers);

app.use((req, res) => {
    console.log('This is 404');
    res.status(404);
    res.end('404 Not Found');
});

// Error Handler middleware is last!
app.use(handler);

module.exports = app;

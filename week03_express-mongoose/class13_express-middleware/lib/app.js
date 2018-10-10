const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler } = require('./util/errors');
const auth = require('./util/auth');
const { HttpError } = require('./util/errors');

// app.use(auth());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const events = require('./routes/events');

app.use('/api/events', events);

app.get('/error', (req, res) => {
    throw new HttpError({ code: 505, message: 'my HttpError' });
});

app.use((req, res) => {
    console.log('This is 404');
    res.status(404);
    res.end('404 Not Found');
});

// Error Handler middleware is last!
app.use(handler);

module.exports = app;

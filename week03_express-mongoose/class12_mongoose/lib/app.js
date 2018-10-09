const express = require('express');
const app = express();
const eventsRouter = require('./routes/events');

app.use(express.json());

app.use('/api/events', eventsRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;

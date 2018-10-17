const express = require('express');
const app = express();
const logger = require('./middleware');

app.use(logger(false));

app.get('/', (req, res) => {
    res.end('DONE!');
});

app.listen(7890);

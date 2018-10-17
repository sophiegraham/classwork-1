const express = require('express');
const app = express();

app.use((req, res, next) => {
    req.startAt = Date.now();
    next();
});

app.get('/', (req, res, next) => {
    res.end('Done!');
    next();
});

app.use((req, res, next) => {
    if(!res.headersSent) {
        res.status(404);
        res.end('404!!');
    }
    next();
});

app.use((req, res) => {
    const responseTime = Date.now() - req.startAt;
    console.log(`${req.method} ${req.path} [${res.statusCode}] ${responseTime}ms`);
});

app.listen(7890, () => {
    /* eslint-disable-next-line no-console */
    console.log('Server started');
});

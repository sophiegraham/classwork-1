const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.get('/fruits/:id', (req, res) => {
    const { path, method, params, query } = req;
    res.json({
        path,
        method,
        params,
        query
    });
});

app.get('/:name', (req, res) => {
    res.send(`${req.query.greeting || 'Hi There'} ${req.params.name}`);
});

app.post('/:name', (req, res) => {
    console.log(req.body);
    res.json({
        hi: `there ${req.params.name}`
    });
});

app.listen(7890, () => {
    console.log('LISTENING on 7890');
});

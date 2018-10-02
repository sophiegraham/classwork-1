/* eslint no-console: off */

const url = require('url');
const http = require('http');

// curl 'http://localhost:7890/hi' -d '{ "name": "ryan" }'
const server = http.createServer((req, res) => {
    const method = req.method;
    const parsedUrl = url.parse(req.url);
    res.write(method);
    res.write('\n');
    res.write(parsedUrl.path);
    
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        res.end(data);
    });
});

const PORT = 7890;

server.listen(PORT, () => {
    console.log('server running on', server.address().port);
});

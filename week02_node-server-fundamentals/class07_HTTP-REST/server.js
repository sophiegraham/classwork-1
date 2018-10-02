/* eslint no-console: off */

const app = require('app');
const http = require('http');

// curl 'http://localhost:7890/hi' -d '{ "name": "ryan" }'
const server = http.createServer(app);

const PORT = 7890;

server.listen(PORT, () => {
    console.log('server running on', server.address().port);
});

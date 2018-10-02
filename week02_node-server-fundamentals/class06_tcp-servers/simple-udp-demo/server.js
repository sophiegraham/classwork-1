const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('error', err => {
    console.log('error', err)
});

server.on('message', msg => {
    console.log(msg.toString());
});

server.on('listening', () => {
    console.log('listening');
});


server.bind(7890);

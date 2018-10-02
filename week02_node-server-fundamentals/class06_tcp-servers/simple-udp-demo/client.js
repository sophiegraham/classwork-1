const dgram = require('dgram');

const client = dgram.createSocket('udp4');

client.send('hi there', 10000);

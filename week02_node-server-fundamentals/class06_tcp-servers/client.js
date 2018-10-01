const dgram = require('dgram');

const client = dgram.createSocket('udp4');

client.send('hi', 41234);
client.send('hi', 41234);
client.send('hi', 41234);

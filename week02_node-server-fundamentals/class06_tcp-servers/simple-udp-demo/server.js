const dgram = require('dgram');

const server = dgram.createSocket('udp4');

// on error
// on message (rinfo.port)
// on listening (server.address())
// bind

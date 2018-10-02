const net = require('net');

const server = net.createServer(client => {
    console.log('client connected');

    client.on('data', data => {
        console.log(`data from client: ${data}`);
    });

    client.on('end', () => {
        console.log('Client disconnected');
    });
});

// we won't do this:
server.listen(15678);

// createServer
// on data
// on end

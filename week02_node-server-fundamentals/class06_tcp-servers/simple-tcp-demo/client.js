const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.connect(15678, () => {
    rl.setPrompt('');
    rl.prompt();

    rl.on('line', input => {
        client.write(input);
    });
    
    client.on('data', data => {
        console.log('server sez:', data);
    });

    client.on('close', () => {
        console.log('server left :(');
        client.destroy();
    });
});

client.setEncoding('utf8');

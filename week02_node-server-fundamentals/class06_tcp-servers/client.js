const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.connect(7890, () => {
    let username;
    rl.setPrompt('');
    rl.prompt();

    rl.on('line', input => {
        client.write(input);
    });
    
    client.on('data', data => {
        console.log(data);
    });

    client.on('close', () => {
        console.log('server left :(');
        client.destroy();
    });
});

client.setEncoding('utf8');

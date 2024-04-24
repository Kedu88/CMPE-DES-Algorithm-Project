const net = require('net');
const readline = require('readline');
const crypto = require('crypto-js');

const key = 'cmpe455labProject!';

const serverA = net.createServer((socket) => {
    console.log('Server: Client connected.');

    // Receive data from Client
    socket.on('data', (data) => {
        const decryptedMessage = decrypt(data.toString(), key);
        console.log('Server: Received Encrypted from Client:', data.toString());
        console.log('Server: Received message from Client:', decryptedMessage);
    });

    // Handle client disconnection
    socket.on('end', () => {
        console.log('Server: Client disconnected.');
    });

    // Set up readline interface for server input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Listen for server input
    rl.on('line', (input) => {
        // Send the input message to the client
        socket.write(input);
    });
});

const PORT_A = 3000;
serverA.listen(PORT_A, () => {
    console.log(`Server: Client listening on port ${PORT_A}`);
});


// function encrypt(text, key) {
//     const des = crypto.DES.encrypt(text, key);
//     return des.toString();
// }

function decrypt(encryptedText, key) {
    const des = crypto.DES.decrypt(encryptedText, key);
    return des.toString(crypto.enc.Utf8);
}
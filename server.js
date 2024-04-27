const net = require('net');
const readline = require('readline');

const { DESDecryption } = require("./des/decryption");
const { DESEncryption } = require("./des/encryption");

const key = 'cmpe455labProject!';

const server = net.createServer((socket) => {
    console.log('Server: Client connected.');

    // Receive data from Client
    socket.on('data', (data) => {
        // const decryptedMessage = decrypt(data.toString(), key);
        const decryptedMessage = DESDecryption(key, data.toString(), key);
        console.log('Server: Received Encrypted value from Client:', data.toString());
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
        // const encryptedInput = encrypt(input, key);
        const encryptedInput = DESEncryption(input, key, key);
        socket.write(encryptedInput);
    });
});

const PORT_A = 3000;
server.listen(PORT_A, () => {
    console.log(`Server: Client listening on port ${PORT_A}`);
});

const net = require('net');
const readline = require('readline');
const crypto = require('crypto-js');

const key = 'cmpe455labProject!';

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create a client to connect to Server
const client = new net.Socket();

// Connect to Server A
const PORT_A = 3000;
const HOST_A = '127.0.0.1'; // localhost
client.connect(PORT_A, HOST_A, () => {
    console.log('Client connected to Server.');

    // Start listening for user input
    prompt.prompt();
});

// Handle user input
prompt.on('line', (input) => {
    // Send user input to Server
    const encryptedInput = encrypt(input, key);
    client.write(encryptedInput);

    // Continue listening for user input
    prompt.prompt();
});

// Handle data received from Server 
client.on('data', (data) => {
    const decryptedMessage = decrypt(data.toString(), key);
    console.log('Client: Received Decrypted message from Server:', data.toString());
    console.log('Client: Received message from Server:', decryptedMessage);
});

// Handle disconnection from Server 
client.on('close', () => {
    console.log('Client: connection to server closed.');
});

function encrypt(text, key) {
    const des = crypto.DES.encrypt(text, key);
    return des.toString();
}

function decrypt(encryptedText, key) {
    const des = crypto.DES.decrypt(encryptedText, key);
    return des.toString(crypto.enc.Utf8);
}
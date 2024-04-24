const net = require('net');
const readline = require('readline');

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create a client to connect to Server A
const clientToA = new net.Socket();

// Connect to Server A
const PORT_A = 3000;
const HOST_A = '127.0.0.1'; // localhost
clientToA.connect(PORT_A, HOST_A, () => {
    console.log('Client connected to Server.');

    // Start listening for user input
    prompt.prompt();
});

// Handle user input
prompt.on('line', (input) => {
    // Send user input to Server A
    clientToA.write(input);

    // Continue listening for user input
    prompt.prompt();
});

// Handle data received from Server A
clientToA.on('data', (data) => {
    console.log('Client: Received message from Server:', data.toString());
});

// Handle disconnection from Server A
clientToA.on('close', () => {
    console.log('Client: connection to server closed.');
});

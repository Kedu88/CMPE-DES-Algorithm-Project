const net = require('net');
const readline = require('readline');

const serverA = net.createServer((socket) => {
    console.log('Server: Client connected.');

    // Receive data from Server B
    socket.on('data', (data) => {
        console.log('Server: Received message from Client:', data.toString());
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

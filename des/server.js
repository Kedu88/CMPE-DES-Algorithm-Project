const net = require('net');
const { DESDecryption } = require('./decryption');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function removeUnwantedCharacters(inputString) {
    const pattern = /[\x00-\x1F\x7F-\x9F]/g;
    const cleanedString = inputString.replace(pattern, '');
    return cleanedString;
}

function receiver() {
    const server = net.createServer((client) => {
        console.log(`Connection from ${client.remoteAddress}:${client.remotePort} established`);
        console.log("#message received#");

        client.on('data', (msg) => {
            const encrypt = msg.toString('utf-8');
            console.log(`Encrypted Ciphertext is: ${encrypt}`);

            rl.question("Enter the key (only 8 bytes):", (key) => {
                if (key.length !== 8) {
                    console.log("Invalid key length. Key must be 8 bytes long.");
                    client.end();
                    return;
                }

                const isExtensionRequired = encrypt.length % 8 !== 0;

                const resultOfDecryption = DESDecryption({
                    key: key,
                    text: encrypt,
                    extension: isExtensionRequired
                });

                console.log("Decrypted text is:", removeUnwantedCharacters(resultOfDecryption));
                client.end();
            });
        });
    });

    server.listen(12345);
}

function sender() {
    rl.question("Enter the IP address of the receiver:", (ip) => {
        rl.question('Enter text:', (inputText) => {
            rl.question("Enter a key (only 8 bytes):", (key) => {
                if (key.length !== 8) {
                    console.log("Invalid key length. Key must be 8 bytes long.");
                    rl.close();
                    return;
                }

                const isExtensionRequired = inputText.length % 8 !== 0;
                const resultOfEncryption = encryptText(inputText, key, isExtensionRequired);

                console.log(`Encrypted Ciphertext is: ${resultOfEncryption}`);

                const client = net.createConnection({ host: ip, port: 12345 }, () => {
                    client.write(resultOfEncryption);
                });

                client.on('end', () => {
                    console.log('Disconnected from server');
                    rl.close();
                });
            });
        });
    });
}

function encryptText(text, key, isExtensionRequired) {
    // Implement DES encryption here
}

rl.question("Do you want to send(s) or receive(r) message:", (choose) => {
    if (choose === "s") {
        sender();
    } else if (choose === "r") {
        receiver();
    } else {
        console.log("Invalid choice.");
        rl.close();
    }
});

module.exports = {
    sender,
    receiver,
};

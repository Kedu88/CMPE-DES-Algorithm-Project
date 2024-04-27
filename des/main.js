const { receiver, sender } = require('./server');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Do you want to send(s) or receive(r) message: ", (choose) => {
    if (choose === "s") {
        sender();
    } else if (choose === "r") {
        receiver();
    } else {
        console.log("Invalid choice.");
    }
    rl.close();
});

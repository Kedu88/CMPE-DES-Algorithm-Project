
function nSplit(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
        array.slice(index * size, index * size + size)
    );
}

const convertToString = array => {
    // Chunking array of bits to 8-sized bytes
    const byteChunks = nSplit(array, 8);

    // Converting each byte to char and then concatenating
    const result = byteChunks.map(byte => String.fromCharCode(parseInt(byte.join(''), 2))).join('');

    // Returning result
    return result;
};

const convertToBinary = text => {
    // Initializing variable required
    let bitArray = [];
    for (const letter of text) {
        // Getting binary (8-bit) value of letter
        const binVal = binValue(letter.charCodeAt(0), 8);
        // Making list of the bits
        const binValArr = Array.from(binVal, Number);
        // Appending the bits to array
        bitArray.push(...binValArr);
    }

    // Returning answer
    return bitArray;
};

const binValue = (val, bitSize) => {
    // Function to return the binary value as a string of given size.
    let binVal = val.toString(2);

    // Appending with the required number of zeros in front
    while (binVal.length < bitSize) {
        binVal = "0" + binVal;
    }

    // Returning binary value
    return binVal;
};

module.exports = {
    nSplit,
    convertToString,
    convertToBinary,
    binValue,
};

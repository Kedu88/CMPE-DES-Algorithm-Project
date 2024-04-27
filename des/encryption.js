const { convertToBinary, convertToString } = require('./convert');
const { permutation, initialPermutationMatrix, eachRoundPermutationMatrix, finalPermutationMatrix } = require('./permutation');
const nSplit = require('./divide_to_bytes');
const { generateKeys } = require('./keys');
const { Sbox_substitution } = require('./sbox');

const addExtension = text => {
    // Function to add padding according to PKCS5 standard.
    const paddingLength = 8 - (text.length % 8);
    text += String.fromCharCode(paddingLength).repeat(paddingLength);
    return text;
};

const expand = (array, table) => {
    // Function to expand the array using table.
    return table.map(element => array[element - 1]);
};

const XOR = (list1, list2) => {
    // Function to return the XOR of two lists.
    return list1.map((element, index) => element ^ list2[index]);
};

const DES = (text, key, isEncrypt) => {
    const isDecrypt = !isEncrypt;
    const keys = generateKeys(key);
    const plain_text_to_8byte_blocks = nSplit(text, 8);
    let result = [];

    for (const block of plain_text_to_8byte_blocks) {
        let blockArray = convertToBinary(block);
        blockArray = permutation(blockArray, initialPermutationMatrix);
        let [left_block, right_block] = nSplit(blockArray, 32);
        let temp;

        for (let i = 0; i < 16; i++) {
            const expanded_right_block = expand(right_block, expandMatrix);
            temp = isEncrypt ? XOR(keys[i], expanded_right_block) : XOR(keys[15 - i], expanded_right_block);
            temp = Sbox_substitution(temp);
            temp = permutation(temp, eachRoundPermutationMatrix);
            temp = XOR(left_block, temp);
            left_block = right_block;
            right_block = temp;
        }

        result = result.concat(permutation(right_block.concat(left_block), finalPermutationMatrix));
    }

    const finalResult = convertToString(result);
    return finalResult;
};

const expandMatrix = [
    32, 1, 2, 3, 4, 5,
    4, 5, 6, 7, 8, 9,
    8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32, 1
];

const DESEncryption = (text, key, extension) => {
    if (extension) {
        text = addExtension(text);
    }
    return DES(text, key, true);
};

module.exports = {
    addExtension,
    DES,
    expand,
    XOR,
    DESEncryption,
};

const { convertToBinary } = require('./convert');
const { permutation, keyPermutationMatrix1, keyPermutationMatrix2 } = require('./permutation');
const nSplit = require('./divide_to_bytes');

const SHIFT = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

const leftShift = (list1, list2, n) => {
    // Function to left shift the arrays by n.
    return [list1.slice(n).concat(list1.slice(0, n)), list2.slice(n).concat(list2.slice(0, n))];
};

const generateKeys = key => {
    const keys = [];
    let binaryKey = convertToBinary(key);
    binaryKey = permutation(binaryKey, keyPermutationMatrix1);
    let [left_block, right_block] = nSplit(binaryKey, 28);

    for (let i = 0; i < 16; i++) {
        [left_block, right_block] = leftShift(left_block, right_block, SHIFT[i]);
        const temp = left_block.concat(right_block);
        keys.push(permutation(temp, keyPermutationMatrix2));
    }

    return keys;
};

module.exports = {
    generateKeys,
    leftShift
};

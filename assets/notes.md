# Notes

## Client & Server

These codes establishes a bidirectional communication channel between the client and the server, allowing them to exchange encrypted messages using the DES algorithm. The user can input messages from the console, which are encrypted and sent to the server, and vice versa.

## convert.nSplit Function

This function efficiently splits an array into smaller chunks of the specified size and returns an array containing these chunks.

## convert.convertToString Function

This function, convertToString, serves to transform an array of binary bits into a string of characters.

## convert.convertToBinary Function

This function, convertToBinary, converts a given text string into an array of binary bits.

## convert.binValue Function

This function binValue takes two parameters: val, the value to be converted to binary, and bitSize, the size of the resulting binary string.

## decryption.removeExtension Function

The function removeExtension is designed to remove padding added to data during encryption.

## decryption.DESDecryption Function

The DESDecryption function decrypts ciphertext using the Data Encryption Standard (DES) algorithm

## divide_to_bytes.nSplit Function

The nSplit function divides an array of elements into smaller chunks of a specified size.

## encryption/addExtention Function

The addExtension function adds padding to the input text according to the PKCS5 standard.

## encryption/expand Function

The expand function expands the input array using a specified expansion table.

## encryption/XOR Function

The XOR function takes two arrays of equal length as input and performs the XOR operation element-wise between corresponding elements of the arrays.

## encryption/DES

This DES function is the core of the Data Encryption Standard (DES) algorithm. Let's break down what it does:

### Input Parameters

- text: The input text to be encrypted or decrypted.
- key: The encryption/decryption key.
- isEncrypt: A boolean flag indicating whether to encrypt (true) or decrypt (false) the text.

### Key Generation

The function generates the required round keys based on the provided encryption key. This step is crucial for both encryption and decryption.

### Text Processing

The input text is divided into 8-byte blocks, as required by the DES algorithm.
Each block is converted into a binary representation.

### Encryption or Decryption

For each block:

- The initial permutation is applied to the block.
- The block is divided into two halves: left and right.
- The main encryption or decryption process is repeated for 16 rounds.
- In each round, the right half of the block is expanded, XOR-ed with the round key, passed through substitution boxes (S-boxes), and permuted.
- Finally, the left and right halves are swapped, and the process is repeated for the next round.
- After the last round, the two halves are concatenated and subjected to the final permutation.

### Output

- The function returns the final encrypted or decrypted result as a string.

This function encapsulates the entire DES algorithm, providing both encryption and decryption functionalities based on the specified key and input text.

## encryption/expandMatrix Function

The expandMatrix is a table used in the DES algorithm for expanding a 32-bit array to a 48-bit array. How it works:

- The matrix is a list of integers representing the positions in the 32-bit array that need to be copied or expanded.
- Each row in the matrix corresponds to a 6-bit portion of the expanded array.
- The values in the matrix indicate which bits from the 32-bit array are copied to generate the expanded 48-bit array.
- This process repeats for each row in the matrix, resulting in an expanded 48-bit array.

## encryption/DESEncryption Function

The DESEncryption function performs the encryption of plaintext using the DES (Data Encryption Standard) algorithm. Here's how it works:

- Extension Check: If the extension parameter is true, indicating that padding is required, the function calls the addExtension function to add padding to the plaintext according to the PKCS5 standard.
- Encryption: The function then calls the DES function with the plaintext, encryption key (key), and a boolean flag true to indicate encryption.
- Return: The encrypted ciphertext is returned as the result.

## keys/shift array

The SHIFT array defines the number of bit positions to shift each half of the 64-bit block during each round of the DES algorithm. Here's a breakdown:

During each round of DES, the 64-bit block is split into two 32-bit halves, the left half and the right half.
The SHIFT array specifies the number of bit positions to shift each half leftwards. The number of shifts varies for each round.
After each round, both halves are shifted left by the specified number of bits. The leftmost bits that are shifted out are reinserted at the rightmost positions.
This shifting operation is a key component of the permutation and substitution processes in DES, contributing to its diffusion and confusion properties.

## keys/leftShift Function

The leftShift function performs a left shift operation on two arrays by a specified number of positions n. Here's how it works:

It takes two arrays list1 and list2 as input, representing two halves of a block (typically 32 bits each).
The function performs a left shift operation on each array independently by n positions.
For each array, it slices the array into two parts:
The first part consists of elements starting from index n to the end of the array.
The second part consists of elements from the beginning of the array up to index n.
It then concatenates these two parts in the shifted order.
Finally, it returns an array containing the shifted versions of list1 and list2.

## keys/generateKeys Function

The generateKeys function is a crucial part of the DES algorithm. It's responsible for generating a set of 16 subkeys from the initial key provided. Here's a breakdown of how it works:

Input: It takes a key as input, which is the initial encryption or decryption key provided by the user.
Output: It returns an array of 16 subkeys, each of which is used in a specific round of the DES algorithm.
Key Generation:
The initial key is converted into binary format using the convertToBinary function.
The binary key undergoes an initial permutation using keyPermutationMatrix1.
The permuted key is then split into two halves, left_block and right_block, each containing 28 bits.
For each of the 16 rounds of the DES algorithm:
Both halves undergo a left circular shift by a variable amount determined by the SHIFT array.
The shifted halves are concatenated and undergo a final permutation using keyPermutationMatrix2.
The resulting permutation becomes one of the 16 subkeys, which is added to the keys array.
Final Output: The function returns the array keys, containing 16 subkeys, each represented as an array of bits.

## permutation/perm

The code defines several permutation matrices used in the DES (Data Encryption Standard) algorithm along with a function to perform permutation on a given bit array using a specified permutation table.

Here's an explanation of each part:

1. Permutation Matrices:

- initialPermutationMatrix: Defines the initial permutation matrix used in the DES algorithm to permute the input data before encryption and after decryption.
- keyPermutationMatrix1: Specifies the permutation matrix used to permute the initial encryption key to generate subkeys.
- keyPermutationMatrix2: Specifies another permutation matrix used in key generation.
- eachRoundPermutationMatrix: Defines the permutation matrix used in each round of the DES algorithm.
- finalPermutationMatrix: Specifies the final permutation matrix applied to the output of the last round before producing the final ciphertext.

2. Permutation Function:

permutation: This function takes a bit array (bit_array) and a permutation table (table). It performs permutation on the bit array using the specified table. Each element in the table represents the position of the corresponding bit in the output array.
These permutation matrices and the permutation function are essential components of the DES algorithm, allowing for the manipulation and transformation of data and keys during encryption and decryption processes.

## sbox/SboxesArray Array

The SboxesArray is an array containing eight S-boxes, each represented as a nested array. Each S-box consists of four rows and sixteen columns, where each cell contains a decimal value from 0 to 15.

Here's a brief explanation of the structure:

The outer array contains eight elements, representing eight different S-boxes used in the DES algorithm.
Each inner array represents a single S-box.
Within each S-box array, there are four rows and sixteen columns.
Each row corresponds to a pair of bits from the input, and each column corresponds to a pair of bits from the output.
The value in each cell of the S-box represents a substitution value based on the input bits. These values are used during the encryption and decryption processes to perform substitution-permutation operations.

## sbox/Sbox_substitution Function

The Sbox_substitution function performs the substitution step using S-boxes in the DES algorithm. Here's a breakdown of how it works:

It first splits the input bit array into blocks of 6 bits each using the nSplit function.
Then, for each block:
It extracts the first and last bits (block[0] and block[5]) to determine the row index.
It extracts the middle four bits (block.slice(1, 5)) and joins them into a string to determine the column index.
It uses these row and column indices to access the appropriate value from the S-box array (SboxesArray) corresponding to the current block.
It converts this value into a 4-bit binary string using the binValue function.
Finally, it flattens this binary string into individual bits and appends them to the result array.

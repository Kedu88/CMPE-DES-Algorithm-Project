const { DES } = require('./encryption');

const removeExtension = data => {
    const paddingLength = data.charCodeAt(data.length - 1);
    return data.slice(0, -paddingLength);
};

const DESDecryption = (key, text, extension) => {
    const plainText = DES(text, key, false);

    if (extension === true) {
        return removeExtension(plainText);
    }

    return plainText;
};

module.exports = {
    DESDecryption,
};

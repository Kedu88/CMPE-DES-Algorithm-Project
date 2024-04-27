const nSplit = (text_list, size) => {
    const result = [];
    for (let i = 0; i < text_list.length; i += size) {
        result.push(text_list.slice(i, i + size));
    }
    return result;
};

module.exports = nSplit;

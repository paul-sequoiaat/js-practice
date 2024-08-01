const fs = require('fs');

const readContentFromFile = async(path) => {
    return fs.readFileSync(path, 'utf-8');
}

const getReadStreamForFile = async(path) => {
    return fs.createReadStream(path, 'utf-8');
}

module.exports = { readContentFromFile, getReadStreamForFile };
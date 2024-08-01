const fs = require('fs').promises;

const readContentFromFile = async(path) => {
    return fs.readFile(path, 'utf-8');
}

module.exports = { readContentFromFile };
const { insert } = require('../../postgres/db-utils');

const query = "INSERT INTO user_data (name, last_update) VALUES %L";

const processMessageAndSaveToDB = async(message) => {
    try {
        const values = message.map(m => [m.name, m.last_update]);
        insert(query, values);
    } catch (err) {
        console.log(`QUEUE STORAGE MESSAGE PROCESS ERROR => ${err}`);
        throw err;
    }
    
}

module.exports = { processMessageAndSaveToDB };

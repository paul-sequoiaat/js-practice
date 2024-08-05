const { insert } = require('../../postgres/db-utils');

const query = "INSERT INTO user_data (name, last_update) VALUES %L";

const processMessageAndSaveToDB = async(message) => {
    const values = message.map(m => [m.name, m.last_update]);
    insert(query, values);
}

module.exports = { processMessageAndSaveToDB };

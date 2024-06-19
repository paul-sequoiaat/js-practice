const pg = require('pg');
const { Client } = pg;
require('dotenv').config();

const client = new Client();

const queryDb = async(text, values) => {
    try {
        const query = createQueryConfig(text, values);
        await client.connect();
        const res = await client.query(query);
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        client.end();
    }
}

const createQueryConfig = (text, values) => {
    return {
        text: text,
        values: values
    };
}

module.exports = { queryDb };

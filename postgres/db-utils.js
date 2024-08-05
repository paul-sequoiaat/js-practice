const pg = require('pg');
const { Pool } = pg;
var format = require('pg-format');
require('dotenv').config();

const pool = new Pool();

const queryDb = async(text, values) => {
    const client = await pool.connect();
    const query = createQueryConfig(text, values);
    try {
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

const insert = async(text, values) => {

    try {
        var sql = format(text, values);
        const client = await pool.connect();
        await client.query(sql);
        console.log(`Successfully inserted ${values.length} entries into database`);
    } catch (err) {
        console.log(`SQL ERROR => ${err}`);
    }
}

module.exports = { queryDb, insert };

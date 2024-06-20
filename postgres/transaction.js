const pg = require('pg');
const { Client } = pg;
require('dotenv').config();

const testTransactionRollbackSuccess = async() => {
    const client = new Client();
    await client.connect();
    try {
        await client.query('BEGIN');
        
        //insert new row with city_id (primary key) as 601
        await client.query(
            `INSERT INTO city 
            VALUES (601, 'Chennai', 105, NOW())`
        );

        //insert another row with same id to cause a duplicate key exception
        await client.query(
            `INSERT INTO city 
            VALUES (601, 'Kochi', 99, NOW())`
        );

        await client.query('COMMIT');
    } catch (err) {
        console.log(`ERROR ${err}`);
        await client.query('ROLLBACK');
    } finally {
        client.end();
    }
}

testTransactionRollbackSuccess();

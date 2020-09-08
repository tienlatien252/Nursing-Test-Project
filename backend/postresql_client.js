const { Client } = require('pg');
require('dotenv').config();

const connectionString = `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASS}@35.225.81.133/${process.env.DATABASE_NAME}`;
var client = new Client({
    connectionString: connectionString
});

client.on('error', error => {
    console.error('Database error', error.message);
    client = null;
});

async function queryPostgres(queryString){
    if(client === null){
        client = new Client({
            connectionString: connectionString
        });
        await client.connect();
        console.error('Reconnect to database');
    }
    result = await client.query(queryString)
    return result;
}

module.exports = {
    client,
    queryPostgres
};
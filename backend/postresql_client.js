const { Client } = require('pg');
require('dotenv').config();

const DATABASE_HOST = process.env.NODE_ENV === "prod" ? "127.0.0.1" : "35.225.81.133";
const connectionString = `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASS}@${DATABASE_HOST}:5432/${process.env.DATABASE_NAME}`;
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
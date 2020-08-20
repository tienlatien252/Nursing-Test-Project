
const { Client } = require('pg');
const connectionString = "postgres://process.env.DATABASE_USERNAME: process.env.DATABASE_PASS,@35.225.81.133/process.env.DATABASE_NAME";

const client = new Client({
    connectionString: connectionString
});

module.exports = client;
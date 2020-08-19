
const { Client } = require('pg');

const connectionString = "postgres://postgres:USER_PASSWORD@35.225.81.133/postgres";

const client = new Client({
    connectionString: connectionString
});

module.exports = client;
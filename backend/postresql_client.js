const { Client } = require('pg');

const connectionString = "postgres://postgres:tunganlinh@35.225.81.133/nursing_db";

const client = new Client({
    connectionString: connectionString
});

client.connect().then(res => app.listen('3000'));

module.exports = client; 
const db = require('../postresql_client')
async function getPurchases (req, res, next) {
    const purchases = await db.query('SELECT * from question')
    console.log(purchases)
    return res.json({ data: "123" })
}
module.exports = getPurchases
const pool = require('../utils/prepared');

const util = require('../utils');

async function read() {
    const client = await pool.connect();
    let result;

    try {
        const query =
            `SELECT i.product_id, i.name, i.quantity, p.name as "person_id"
            FROM "public"."input_storages" i, "public"."people" p
            WHERE i.person_id = p.person_id
            LIMIT 1000`;
        
        result = await client.query({
            text: query,
        });
    } finally {
        client.release();
    }
    
    return util.buildResponse(200, { "products": result.rows });
}

module.exports.read = read;
const pool = require('../utils/prepared');

const util = require('../utils');

async function readReport() {
    const client = await pool.connect();
    let result;

    try {
        const query =
            `SELECT SUM(quantity) AS total FROM "public"."input_storages";`
        result = await client.query({
            text: query,
        });
    } finally {
        client.release();
    }

    return util.buildResponse(200, { "total": result.rows[0].total });
}

module.exports.readReport = readReport;
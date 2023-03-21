
require('dotenv').config({ path: '../../.env' });
const { pool } = require('./mysqlcon');


function reformat(original) {
    original = original.slice(0, -3);
    return original + ']';
}


async function updateTags() {

    // get all id
    const [ ids ] = await pool.query(`
    SELECT id, tags FROM product;
    `);

    for ( let i = 0; i < ids.length; i++ ) {
        const { id, tags } = ids[i];
        const newTag = reformat(tags);
        // update tags
        await pool.query(`
        UPDATE product SET tags = ? WHERE id = ?;
        `, [ newTag, id ]);
    }
}

(async () => {
    console.log('start');
    await updateTags();
    console.log('end');
})();
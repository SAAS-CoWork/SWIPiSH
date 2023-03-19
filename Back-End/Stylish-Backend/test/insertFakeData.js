const { pool } = require('../server/models/mysqlcon');
const { readData } = require('../test/readData')

const files = ['caco_datas_men', 'caco_datas_women', 'caco_datas_accessories']

async function insertFakeProduct() {

    const conn = await pool.getConnection();

    for ( let i = 0; i < files.length; i++ ) {
        const { data } = await readData(`../${files[i]}`)

        for ( let j = 0; j < data.length; j++ ) {
            await conn.beginTransaction();
            try {
                // insert product table
                const category = files[i].slice(files[i].lastIndexOf('_') + 1, files[i].length);
                const product_id = await insertProductTable( conn, data[j], category );

                // insert variant table
                await insertVariantTable( conn, product_id );

                await conn.commit();

            } catch (err) {
                console.error(err)
                await conn.rollback();
            }
        }
    }
    await conn.release();
}

async function insertProductTable( conn, data, category ) {
    const desc = 'SWIPiSH 開幕限定'
    const texture = ['棉質', '羊毛', '人造纖維', '亞麻', '皮革', '嫘縈', '絨布', '丹寧', '聚脂纖維', '衝鋒']
    const wash = ['手洗', '可機洗', '送洗']
    const place = ['Taiwan', 'Japan', 'Korea', 'China', 'India', 'Vietnam']
    const note = '正版授權'
    const story = '期間限定錯過不再'

    const randomTexture = Math.floor( Math.random() * texture.length )
    const randomWash = Math.floor( Math.random() * wash.length )
    const randomPlace = Math.floor( Math.random() * place.length )

    const [ insertInfo ] = await conn.query(`
    INSERT INTO product
    ( category, title, description, price, texture, wash, place, note, story, main_image )
    VALUES
    ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
    `, [ category, data.title, desc, data.price, texture[randomTexture], wash[randomWash], place[randomPlace], note, story, data.img ]);

    return insertInfo.insertId;
}


async function insertVariantTable( conn, product_id ) {
    const colorIds = [1, 2, 3];
    const sizes = ['S', 'M', 'L'];
    const stock = 10;

    for ( let i = 0; i < colorIds.length; i++ ) {
        for ( let j = 0; j < sizes.length; j++ ) {
            await await conn.query(`
            INSERT INTO variant
            ( product_id, color_id, size, stock )
            VALUES ( ?, ?, ?, ? )
            `, [ product_id, colorIds[i], sizes[j], stock ])
        }
    }
}


(async () => {
    console.log('Insert started');
    await insertFakeProduct()
    console.log('Insert completed');
})();



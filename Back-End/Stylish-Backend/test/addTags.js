const { pool } = require('../server/models/mysqlcon');

const texturesRef = {
    '棉質': 0,
    '羊毛': 1,
    '人造纖維': 2,
    '亞麻': 3,
    '皮革': 4,
    '嫘縈': 5,
    '絨布': 6,
    '聚脂纖維': 7,
    '衝鋒': 8,
    '丹寧': 9
}

const categoryRef = {
    'men': 0,
    'women': 1,
    'accessories': 2
}

const priceRef = {
    '499': 0,
    '999': 1,
    '1999': 2,
    '3999': 3
}

// [ cat, title, price, ref ]
async function addTags() {
    const [ allProducts ] = await pool.query(`
    SELECT id, category, title, price, texture FROM product
    `);

    for ( let i = 0; i < allProducts.length; i++ ) {
        const productInfo = allProducts[i];
        const texture = texturesRef[productInfo.texture];
        const category = categoryRef[productInfo.category];
        const price = priceRef[determinePriceBand(productInfo.price)];
        const title = determineTitleTag(productInfo.title);

        const tags = [category, title, price, texture];

        await pool.query(`
        UPDATE product SET tags = ? WHERE id = ?;
        `, [ JSON.stringify(tags), productInfo.id ]);
    }
}

function determinePriceBand(price) {
    let result;
    switch (price) {
        case (price < 500):
            return '499';
        case ( price < 1000 ):
            return '999';
        case ( price < 2000 ):
            return '1999';
    }
    return '3999';
}

function determineTitleTag(title) {
    const shirt = ['連帽T', '衣', 'T', '背心', '衫', '杉'];
    const pants = ['褲'];
    const jacket = ['外套'];
    const dress = ['披肩', '套裝', '裙', 'Bra', '洋裝'];
    const bag = ['包', '袋', ];
    const hat = ['帽'];
    const socks = ['襪', '公仔'];
    const arr = [ shirt, pants, jacket, dress, bag, hat, socks ]

    for ( let i = 0; i < arr.length; i++ ) {
        for ( let j = 0; j < arr[i].length; j++ ) {
            if ( title.includes(arr[i][j]) ) {
                return i;
            }
        }
    }
    
}


(async () => {
    console.log('start');
    await addTags();
    console.log('complete!');
})();
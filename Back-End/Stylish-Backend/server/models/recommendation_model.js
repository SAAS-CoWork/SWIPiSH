require('dotenv').config({ path: '../../.env'});
const { pool } = require('./mysqlcon');
const Cache = require('../../util/cache');

const findSimilarProducts = async function (user_id) {
    const [ likedProducts ] = await pool.query(`
    SELECT score, tags FROM
    liked_product AS liked_p
    INNER JOIN
    product AS p
    WHERE liked_p.user_id = ? AND liked_p.product_id = p.id;
    `, [user_id]);

    const catScores = {};
    const titleScores = {};
    const priceScores = {};
    const textureScores = {};

    likedProducts.map((likedProduct) => {
        const { score } = likedProduct;
        const tags = JSON.parse(likedProduct.tags);
        addScore( catScores, score, tags[0] );
        addScore( titleScores, score, tags[1] );
        addScore( priceScores, score, tags[2] );
        addScore( textureScores, score, tags[3] );
    })

    const arr = [ catScores, titleScores, priceScores, textureScores ];

    return arr.map((obj) => {
        return Object.entries(obj).sort((a, b) => {
            return b[1] - a[1];
        })
    });
}

const generateRecommendations = async function ( user_id, isFirst ) {

    if ( isFirst ) {
        // generate random 10 recommendations
        console.log('new user, generate random recommendations');
        // const recommendations = await randomRecommendations();
        const recommendations = await quizRecommendations(user_id);
        recommendations.forEach((reco) => {
            Cache.rPush(user_id, JSON.stringify(reco));
        });
        console.log('Push to redis');
        return;   
    }

    console.log('old user, generate recommendation through history');
    const productsScore = await findSimilarProducts(user_id);
    const result = findAllSubsets(user_id, productsScore);
    return;
     
}

async function quizRecommendations( user_id ) {
    const [ quizAnswer ] = await pool.query(`
    SELECT * FROM quiz WHERE user_id = ?;
    `, [ user_id ]);

    const answers = Object.values(quizAnswer[0]).slice(1);
    const totalScore = answers.reduce((acc, cur) => {
        return acc + +cur;
    }, 0);

    let result;
    // if totalScore > 10 | 送洗
    if ( totalScore > 10 ) {
        result = await pool.query(`
        SELECT id, category, title, story, price, main_image
        FROM product
        WHERE wash = ?;
        `, ['送洗']);
    }

    // if 5 < totalScore <= 10 | 可機洗
    if ( 5 < totalScore <= 10 ) {
        result = await pool.query(`
        SELECT id, category, title, story, price, main_image
        FROM product
        WHERE wash = ?;
        `, ['可機洗']);
    }

    // is 5 <= total score | 手洗
    if ( 5 <= totalScore ) {
        result = await pool.query(`
        SELECT id, category, title, story, price, main_image
        FROM product
        WHERE wash = ?;
        `, ['手洗']);
    }

    console.log(result[0].slice(0, 10));
    return result[0].slice(0, 10);
}

// async function randomRecommendations() {
//     const [ products ] = await pool.query(`
//     SELECT id, category, title, story, price, main_image
//     FROM product
//     ORDER BY RAND()
//     LIMIT 10;
//     `);
//     return products;
// }

function addScore( scoresObj, score, tag ) {
    if ( scoresObj.hasOwnProperty(tag) ) {
        scoresObj[tag] += score;
        return;
    }
    scoresObj[tag] = score;
}

async function getPossibleProducts( pattern ) {
    const [ products ] = await pool.query(`
    SELECT id, category, title, story, price, main_image
    FROM product
    WHERE tags = ?;
    `, [ pattern ]);

    return products;
}

function findAllSubsets( user_id, productsScore ) {
    const result = [];
    const temp = [];
    findAllSubsetsHelper( user_id, productsScore, result, temp );
    return result;
}

async function findAllSubsetsHelper( user_id, productsScore, result, temp ) {
    const pos = temp.length;
    if ( pos === productsScore.length ) {
        result.push(Array.from(temp));
        // select matched product and push to redis list
        const tagsPattern = JSON.stringify(temp);
        const possibleProducts = await getPossibleProducts( tagsPattern );
        for ( let i = 0; i < possibleProducts.length; i++ ) {
            Cache.rPush(user_id, JSON.stringify(possibleProducts[i]));
        }
    } else {
        for ( let i = 0; i < productsScore[pos].length; i++ ) {
            temp.push(productsScore[pos][i][0]);
            findAllSubsetsHelper( user_id, productsScore, result, temp );
            temp.pop();
        }
    }
}

async function checkIfNewUser( user_id ) {
    const [ data ] = await pool.query(`
    SELECT product_id FROM liked_product WHERE user_id = ?
    `, [ user_id ]);

    return data;
}

async function updateLikedProduct( user_id, product_id, score ) {

    try {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        const [ data ] = await pool.query(`
        SELECT product_id FROM liked_product WHERE user_id = ? AND product_id = ?
        `, [ user_id, product_id ]);

        // already liked
        if ( data.length !== 0 ) {
            await conn.query(`
            UPDATE liked_product SET score = score + ? WHERE user_id = ? AND product_id = ?;
            `, [ score, user_id, product_id ]);
            console.log('updated');
            await conn.commit();
            await conn.release();
            return true;
        }

        // new like
        await conn.query(`
        INSERT INTO liked_product ( user_id, product_id )
        VALUES ( ?, ? )
        `, [ user_id, product_id ]);
        await conn.commit();
        await conn.release();
        console.log('inserted');
        return true;

    } catch (err) {
        console.error(err);
        await conn.rollback();
        await conn.release();
        return false;
    }
}


module.exports = {
    generateRecommendations,
    checkIfNewUser,
    updateLikedProduct
};
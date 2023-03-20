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
        console.log('new user, generate random recommendations');
        const recommendations = await quizRecommendations(user_id);
        return recommendations;   
    }

    console.log('old user, generate recommendation through history');
    const productsScore = await findSimilarProducts(user_id);
    console.log(productsScore);

    // find 10 recommendations
    const subsets = findAllSubsets(productsScore);
    const result = await doRecommendation( user_id, subsets );
    return result;
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

async function doRecommendation( user_id, subsets ) {
    let result = [];

    // create user_id field if not exitst
    await Cache.HSETNX('recommendations', user_id, 0);

    // pass through numbers
    let pass =  await Cache.HGET('recommendations', user_id);
    if ( pass > 30 ) {
        pass -= 30;
        await Cache.HSET('recommendations', user_id, pass);
    }

    for ( let i = 0; i < subsets.length; i++ ) {
        const tagsPattern = JSON.stringify(subsets[i]);
        const possibleProducts = await getPossibleProducts( tagsPattern );
        if ( pass >= possibleProducts.length ) {
            pass -= possibleProducts.length;
            continue;
        }
        const newPossibleProducts = possibleProducts.slice(pass);
        await Cache.HINCRBY('recommendations', user_id, newPossibleProducts.length);
        result = [...result, ...newPossibleProducts];
        if ( result.length >= 10 ) {
            return result;
        }
    }
}

function findAllSubsets( productsScore ) {
    const result = [];
    const temp = [];
    findAllSubsetsHelper( productsScore, result, temp );
    return result;
}

function findAllSubsetsHelper( productsScore, result, temp ) {
    const pos = temp.length;
    if ( pos === productsScore.length ) {
        result.push(Array.from(temp));
    } else {
        for ( let i = 0; i < productsScore[pos].length; i++ ) {
            temp.push(Number(productsScore[pos][i][0]));
            findAllSubsetsHelper( productsScore, result, temp );
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

        if ( score < 0 ) {
             // new like
            await conn.query(`
            INSERT INTO liked_product ( user_id, product_id, score )
            VALUES ( ?, ?, ? )
            `, [ user_id, product_id, 100+score ]);
            await conn.commit();
            await conn.release();
            console.log('inserted');
            return true;
        }

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
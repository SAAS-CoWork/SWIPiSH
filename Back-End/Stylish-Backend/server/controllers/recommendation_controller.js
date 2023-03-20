require('dotenv').config();
const Cache = require('../../util/cache');
const {
    generateRecommendations,
    checkIfNewUser,
    updateLikedProduct
} = require('../models/recommendation_model');

const swipe = async function (req, res) {
    const { user } = req;
    const { product_id } = req.body;
    const { like } = req.body;

    if ( !product_id || !like ) {
        return res.status(400).json('Missing required info');
    }

    const { super_like } = req.body;

    let score = 3;
    if ( !like ) {
        score = -1;
    }

    if ( super_like ) {
        score = 6;
    }

    // update liked_product table
    const successfulUpdate =  await updateLikedProduct( user.id, product_id, score );
    if ( !successfulUpdate ) {
        return res.status(500).json('Internal server error');
    }
    console.log('successfully update');
    return res.status(200).json('Updated');
};

const getRecommendation = async function (req, res) {
    const { user } = req;

    try {
        let isNewUser = false;
        const checkResult = await checkIfNewUser( user.id );
        if ( checkResult.length === 0 ) {
            isNewUser = true;
        }

        if ( isNewUser ) {
            await generateRecommendations( user.id, true );
        }

        // get recommendation from redis
        const recommendations = [];
        for ( let i = 0; i < 10; i++ ) {
            const reco = await Cache.lPop(user.id);
            recommendations.push(JSON.parse(reco));
        }
        
        const remained = await Cache.lLen(user.id);
        console.log('Cache remained', remained);
        if ( remained < 20 ) {
            await generateRecommendations(user.id, false);
        }

        const responseObj = {
            data: recommendations
        }

        return res.status(200).json(responseObj)
        
    } catch (err) {
        console.error(err)
        return res.status(500).json('Internal server error');
    }

};


module.exports = {
    swipe,
    getRecommendation
};
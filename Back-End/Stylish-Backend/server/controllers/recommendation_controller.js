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

    let score = 10;
    if ( !like ) {
        score = -5;
    }

    if ( super_like ) {
        score = 20;
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
    console.log(user.id);
    try {
        let isNewUser = false;
        const checkResult = await checkIfNewUser( user.id );
        if ( checkResult.length === 0 ) {
            isNewUser = true;
        }

        const responseObj = { data: '' }

        const recommendations = await generateRecommendations( user.id, isNewUser );
        responseObj.data = recommendations.slice(0, 10);
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
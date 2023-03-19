require('dotenv').config();
const validator = require('validator');
const User = require('../models/recommendation_model');

const swipe = async function (req, res) {

};

const getRecommendation = async function (req, res) {
    const { user } = req;

    // get recommendation from database

    // recommendation algorithm
    



};


module.exports = {
    swipe,
    getRecommendation
};
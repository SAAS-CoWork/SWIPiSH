const router = require('express').Router();

const { wrapAsync, authentication } = require('../../util/util');

const { swipe, getRecommendation } = require('../controllers/recommendation_controller');

const { USER_ROLE } = require('../models/user_model');

router.route('/recommendation').post(authentication(USER_ROLE.VIPUSER), wrapAsync(swipe));

router.route('/recommendation').get(authentication(USER_ROLE.VIPUSER), wrapAsync(getRecommendation));

module.exports = router;
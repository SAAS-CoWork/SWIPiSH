const router = require('express').Router();

const { wrapAsync, authentication } = require('../../util/util');

router.route('/service/email').get(authentication(), wrapAsync(getUserProfile));

router.route('/service/email').post(authentication(), wrapAsync(createQuizAnswer));

module.exports = router;
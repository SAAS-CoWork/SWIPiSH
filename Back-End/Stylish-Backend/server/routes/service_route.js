const router = require('express').Router();

const { wrapAsync, authentication } = require('../../util/util');

const { sendEmail } =  require('../controllers/service_controller');

router.route('/service/email').post(authentication(), wrapAsync(sendEmail));

module.exports = router;
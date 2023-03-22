const router = require('express').Router();
const { wrapAsync, authentication } = require('../../util/util');

const {
  checkout,
  getUserPayments,
  getUserPaymentsGroupByDB,
  getSubscription,
  subscriptionPayment,
  cancelSub
} = require('../controllers/order_controller');

const { USER_ROLE } = require('../models/user_model');

router.route('/order/checkout').post(authentication(USER_ROLE.ALL), wrapAsync(checkout));

// For load testing (Not in API Docs)
router.route('/order/payments').get(wrapAsync(getUserPayments));

router.route('/order/payments2').get(wrapAsync(getUserPaymentsGroupByDB));

// subscription
router.route('/order/subscription').get(authentication(), wrapAsync(getSubscription));

router.route('/order/subscription').post(authentication(), cancelSub, wrapAsync(subscriptionPayment));

module.exports = router;

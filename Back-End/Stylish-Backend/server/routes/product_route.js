const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const { getProducts, searchProducts, getProduct } = require('../controllers/product_controller');

router.route('/products/:category(all|men|women|accessories)').get(wrapAsync(getProducts));

router.route('/products/search').get(wrapAsync(searchProducts));

router.route('/products/details').get(wrapAsync(getProduct));

module.exports = router;

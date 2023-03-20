require('dotenv').config();
const validator = require('validator');
const { TAPPAY_PARTNER_KEY, TAPPAY_MERCHANT_ID } = process.env;
const Order = require('../models/order_model');

const checkout = async (req, res) => {
  const data = req.body;
  if (!data.order || !data.order.total || !data.order.list || !data.prime) {
    res.status(400).send({ error: 'Create Order Error: Wrong Data Format' });
    return;
  }
  const user = req.user;
  const now = new Date();
  const number =
    '' +
    now.getMonth() +
    now.getDate() +
    (now.getTime() % (24 * 60 * 60 * 1000)) +
    Math.floor(Math.random() * 10);
  const orderRecord = {
    number: number,
    time: now.getTime(),
    status: -1, // -1 for init (not pay yet)
    total: data.order.total,
    details: validator.blacklist(JSON.stringify(data.order), '<>'),
  };
  orderRecord.user_id = user && user.id ? user.id : null;
  const orderId = await Order.createOrder(orderRecord);
  let paymentResult;
  try {
    paymentResult = await Order.payOrderByPrime(
      TAPPAY_PARTNER_KEY,
      TAPPAY_MERCHANT_ID,
      data.prime,
      data.order
    );
    if (paymentResult.status != 0) {
      res.status(400).send({ error: 'Invalid prime' });
      return;
    }
  } catch (error) {
    res.status(400).send({ error });
    return;
  }
  const payment = {
    order_id: orderId,
    details: validator.blacklist(JSON.stringify(paymentResult), '<>'),
  };
  await Order.createPayment(orderId, payment);
  res.send({ data: { number } });
};

// For Load Testing
const getUserPayments = async (req, res) => {
  const orders = await Order.getUserPayments();
  const userPayments = orders.reduce((obj, order) => {
    let userId = order.user_id;
    if (!(userId in obj)) {
      obj[userId] = 0;
    }
    obj[userId] += order.total;
    return obj;
  }, {});
  const userPaymentsData = Object.keys(userPayments).map((userId) => {
    return {
      userId: parseInt(userId),
      totalPayment: userPayments[userId],
    };
  });
  res.status(200).send({ data: userPaymentsData });
};

const getUserPaymentsGroupByDB = async (req, res) => {
  const orders = await Order.getUserPaymentsGroupByDB();
  res.status(200).send({ data: orders });
};

// get Subscription
const getSubscription = async (req, res) => {
  return res.status(200).json('pass authentication to get subscription page');
};

/*
req.user {
  provider: 'native',
  name: 'as',
  email: 'abcdefgh@gmail.com',
  picture: null,
  id: 10297,
  iat: 1679212798
}
*/

// post Subscription
const subscriptionPayment = async (req, res) => {
  const user = req.user
  const userId = user.id
  let roleId = await User.getRoleId(userId)

  // role_id = 3 redirect to index
  if (roleId == 3) {
    return res.status(307).json({ message: 'Already paid, redirect to index' })
  }

  // proceeed to payment
  console.log('body', req.body)
  const { data } = req.body;
  if (!data || !data.prime || !data.plan || !data.price || !data.subscription_time) {
    return res.status(400).json({ error: 'Subscription Error: Wrong Data Format' });
  }

  // validate frontend data - price & plan matched
  if (data.plan !== "premium" || data.plan !== "platinum") {
    return res.status(400).json({ error: 'Wrong Plan' })
  }
  if (data.plan === "premium") {
    if (data.price !== 4.99) {
      return res.status(400).json({ error: 'Wrong Price' });
    }
  }

  if (data.plan == "platinum") {
    if (data.price !== 49.99) {
      return res.status(400).send({ error: 'Wrong Price' });
    }
  }

  // create sub details into DB
  const subId = await createSubDetail(user.id, data.plan, data.price)
  console.log({ subId })

  // server request to tappay


  // check TapPay response, update order table(paid_at, paid_status)

  // success => update user's role_id into 3


  return res.status(200).json({
    plan: "premium",
    expire: "2023-03-19"
  });
};

module.exports = {
  checkout,
  getUserPayments,
  getUserPaymentsGroupByDB,
  getSubscription,
  subscriptionPayment
};

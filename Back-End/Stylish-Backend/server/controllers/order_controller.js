require('dotenv').config();
const validator = require('validator');
const { TAPPAY_PARTNER_KEY, TAPPAY_MERCHANT_ID } = process.env;
const Order = require('../models/order_model');
const User = require('../models/user_model');
const axios = require("axios")

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
  res.send({ data: { number, total: data.order.total, list: data.order.list } });
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
  const { data } = req.body;
  if (!data || !data.prime || !data.plan || !data.price) {
    return res.status(400).json({ error: 'Subscription Error: Wrong Data Format' });
  }

  // validate frontend data - price & plan matched
  if (data.plan != "premium" && data.plan != "platinum") {
    return res.status(400).json({ error: 'Wrong Plan' })
  }

  if (data.plan == "premium") {
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
  const subId = await Order.createSubDetail(user.id, data.plan, data.price)

  // server request to tappay
  try {
    const tapPayData = {
      partner_key: TAPPAY_PARTNER_KEY,
      prime: `${data.prime}`,
      amount: 5,
      merchant_id: TAPPAY_MERCHANT_ID,
      details: "Some item",
      cardholder: {
        phone_number: "+886923456789",
        name: "王小明",
        email: "LittleMing@Wang.com",
        zip_code: "100",
        address: "台北市天龍區芝麻街1號1樓",
        national_id: "A123456789"
      },
      remember: true
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": TAPPAY_PARTNER_KEY
      }
    }

    const result = await axios.post(
      'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', tapPayData, config)

    paidResult = result.data
  } catch (e) {
    console.error(e)
    return res.status(400).json({ error: "axios failed" })
  }

  // payment failed => response to frontend
  const paidStatus = paidResult.status
  if (paidStatus != 0) {
    return res.status(400).json({ error: paidResult.msg })
  }

  // success => update order table(paid_at, paid_status, expiry,card_secret )
  //         => update user's role_id into 3
  const card = JSON.stringify(paidResult.card_secret)
  const paidAt = paidResult.transaction_time_millis

  if (data.plan == "premium") {
    const period = 30
    let expireObj = await Order.updateAfterPaid(period, paidAt, card, subId, userId)
    const expire = expireObj.toLocaleString();

    return res.status(200).json({
      plan: data.plan,
      expire
    });
  };

  if (data.paln == "platinum") {
    const period = 365
    let expireObj = await Order.updateAfterPaid(period, paidAt, card, subId, userId)
    const expire = expireObj.toLocaleString();

    return res.status(200).json({
      plan: data.plan,
      expire
    });
  }
};

const cancelSub = async (req, res, next) => {
  // cancel = false
  const cancel = req.body
  if (!cancel) {
    next()
  }

  // cancel = true, role = 3
  const userId = req.user.id
  let roleId = await User.getRoleId(userId)
  if (cancel && roleId == 3) {
    const canceled = await Order.updateCancel(userId)
    if (canceled == true) {
      return res.status(200).json({ message: 'canceled success' })
    }
  }
  next()
};

// get auto sub list daily
const getAutoSubList = async (req, res) => {
  try {
    const result = await Order.getTodayExpire();
    return res.json(result)
  } catch (e) {
    console.log(e)
    return res.json(e)
  }
}

// update DB expire for auto-sub
const goDBupdateExpire = async (req, res) => {
  try {
    const { userId } = req.body
    const goDB = await Order.updateTodayExpire(userId);
    return res.json("DONE")
  } catch (e) {
    console.log(e)
    return res.json(e)
  }
}

const goDBupdateRole = async (req, res) => {
  try {
    const { userId } = req.body
    const goDB = await Order.updateTodayRole(userId)
    return res.json("DONE")
  } catch (e) {
    console.log(e)
    return res.json(e)
  }
}

module.exports = {
  checkout,
  getUserPayments,
  getUserPaymentsGroupByDB,
  getSubscription,
  subscriptionPayment,
  cancelSub,
  getAutoSubList,
  goDBupdateExpire,
  goDBupdateRole
};

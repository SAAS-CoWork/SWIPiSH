const { pool } = require('./mysqlcon');
const got = require('got');

const createOrder = async (order) => {
  const [result] = await pool.query('INSERT INTO order_table SET ?', order);
  return result.insertId;
};

const createPayment = async function (orderId, payment) {
  const conn = await pool.getConnection();
  try {
    await conn.query('START TRANSACTION');
    await conn.query('INSERT INTO payment SET ?', payment);
    await conn.query('UPDATE order_table SET status = ? WHERE id = ?', [0, orderId]);
    await conn.query('COMMIT');
    return true;
  } catch (error) {
    await conn.query('ROLLBACK');
    return { error };
  } finally {
    conn.release();
  }
};

const payOrderByPrime = async function (tappayKey, tappayId, prime, order) {
  let res = await got.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': tappayKey,
    },
    json: {
      prime: prime,
      partner_key: tappayKey,
      merchant_id: tappayId,
      details: 'Stylish Payment',
      amount: order.total,
      cardholder: {
        phone_number: order.recipient.phone,
        name: order.recipient.name,
        email: order.recipient.email,
      },
      remember: false,
    },
    responseType: 'json',
  });
  return res.body;
};

const getUserPayments = async () => {
  const [orders] = await pool.query('SELECT user_id, total FROM order_table');
  return orders;
};

const getUserPaymentsGroupByDB = async () => {
  const [orders] = await pool.query(
    'SELECT user_id, SUM(total) as total_payment FROM order_table GROUP BY user_id'
  );
  return orders;
};

// insert subscription details(not paid yet)
const createSubDetail = async (id, plan, price) => {
  try {
    const [result] = await pool.query(`
  INSERT INTO subscription (user_id, plan, price) VALUES (?, ?, ?)
  `, [id, plan, price]);
    subId = result.insertId;
    return subId;
  } catch (e) {
    console.error(e)
  }
};

// update subscription table after paid success
// update user role_id
const updateAfterPaid = async (period, paidAt, subId, userId) => {
  try {
    await pool.query(`
    UPDATE subscription 
    SET expire = DATE_ADD(NOW(), INTERVAL ? DAY),
    paid_at = ?
    WHERE id = ?
    `, [period, paidAt, subId])

    await pool.query(`
    UPDATE user
    SET role_id = 3
    WHERE id = ?
    `, [userId])

    const [expire] = await pool.query(`
    SELECT expire FROM subscription WHERE id = ? 
    `, [subId])
    return expire[0]['expire'];
  } catch (e) {
    console.error(e)
  }
};

module.exports = {
  createOrder,
  createPayment,
  payOrderByPrime,
  getUserPayments,
  getUserPaymentsGroupByDB,
  createSubDetail,
  updateAfterPaid
};

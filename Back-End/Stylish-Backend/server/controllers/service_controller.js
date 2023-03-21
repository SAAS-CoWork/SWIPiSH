
require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
});

const mgDomain = process.env.MAILGUN_DOMAIN;

const getEmailHistory = (req, res) => {
    // select email history from db

    // organized

    // response
}

const sendEmail = (req, res) => {
    // organize req data

    const fakeData = {
        from: 'SWIPiSH Customer Center <service@swipish.com>',
        to: 'c.s.fangyolk@gmail.com',
        subject: 'Welcome to SWIPiSH',
        text: 'Thank you for subscripting SWIPiSH'
    }

    // fetch mailgun api

    // response
}

module.exports = {
    getEmailHistory,
    sendEmail
}
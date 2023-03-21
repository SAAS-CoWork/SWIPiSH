
require('dotenv').config({ path: '../../.env' });
const { SENDER } = require('../constants/mail');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const path = require('path');
const fsPromises = require('fs').promises;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
});

const mgDomain = process.env.MAILGUN_DOMAIN;
const logoPath = path.resolve(__dirname, '../../public/images/Swipe_1.png');


const getEmailHistory = (req, res) => {
    // select email history from db

    // organized

    // response
}

const sendEmail = (req, res) => {
    // organize req data
    // const { user } = req;

    const messageData = {
        from: SENDER,
        to: 'c.s.fangyolk@gmail.com',
        subject: `Hi 感謝您的提問`,
        attachment: { data: 'file', filename: 'Swipe_1.png' },
        html: `
        <h1>Thank you for using SWIPiSH</h1>
        <p>We will keep offering you the best experience</p>
        <img src="cid:Swipe_1.png">
        `
    }

    // fetch mailgun api
    fsPromises.readFile(logoPath)
        .then(data => {
            const file = {
                filename: 'Swipe_1.png',
                data
            }

            messageData.inline = file;
            return mg.messages.create('sandbox-123.mailgun.org', messageData);
        })
        .then(response => {
            console.log(response);
        })

    // mg.messages.create(mgDomain, messageData)
    //     .then(res => console.log)
    //     .catch(err => console.error)

    // response
}

(() => {
    sendEmail();
})();

module.exports = {
    getEmailHistory,
    sendEmail
}
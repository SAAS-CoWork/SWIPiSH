
require('dotenv').config({ path: '../../.env' });
const { SENDER } = require('../constants/mail');
const path = require('path');
const fsPromises = require('fs').promises;
const { mgClient } = require('../../util/mail');

const mgDomain = process.env.MAILGUN_DOMAIN;
const logoPath = path.resolve(__dirname, '../../public/images/Swipe_1.png');

const sendEmail = async (req, res) => {
    // organize req data
    const { user } = req;
    if ( !user ) {
        return res.status(400).json('Missing request parameters');
    }

    let message = `
    <h1>我們已收到您的提問，將會立即指派專人為您協助</h1>
    <h2 style="display:flex;align-items:center;"><img src="cid:Swipe_1.png" style="margin-right:10px;">SWIPiSH 感謝您的使用</h2>
    `;

    const messageData = {
        from: SENDER,
        // to: `${user.email}`,
        to: `${user.email}`,
        subject: `Hi ${user.name} 感謝您的來信`,
        html: message
    }

    // fetch mailgun api
    fsPromises.readFile(logoPath)
        .then(data => {
            const file = {
                filename: 'Swipe_1.png',
                data
            }

            messageData.inline = file;
            return mgClient.messages.create(mgDomain, messageData);
        })
        .then(response => {
            console.log(response);
        })

    return res.status(200).json('Successfully send email');
}

module.exports = {
    sendEmail
}
const axios = require('axios');
require('dotenv').config({ path: '../.env' });
// const { TAPPAY_PARTNER_KEY, TAPPAY_MERCHANT_ID } = process.env;
const TAPPAY_PARTNER_KEY = 'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG'
const TAPPAY_MERCHANT_ID = 'AppWorksSchool_CTBC'

const autoSub = async () => {
    const res = await axios.get('http://localhost:3000/api/1.0/order/autosub')
    const autoSubList = res.data
    console.log(autoSubList)

    const conf = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    for (let item of autoSubList) {
        const cancel = item.cancel
        console.log('有取消嗎', cancel)
        let userId = item.user_id

        if (cancel) {
            // auto set role = 2
            try {
                await axios.post('http://localhost:3000/api/1.0/order/autoexpire', { userId }, conf)
                console.log("set role=2 done")
            } catch (e) {
                console.error(e)
            }
        }
    }

    // auto extend expire 
    config = {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": TAPPAY_PARTNER_KEY
        }
    }


    let response = []
    for (let item of autoSubList) {
        const cancel = item.cancel
        if (!cancel) {
            console.log("for start")
            let tapPayData = {
                "card_key": item.card_secret.card_key,
                "card_token": item.card_secret.card_token,
                "partner_key": TAPPAY_PARTNER_KEY,
                "currency": "TWD",
                "merchant_id": TAPPAY_MERCHANT_ID,
                "details": "Auto Sub",
                "amount": 100
            }
            response.push(await axios.post(
                'https://sandbox.tappaysdk.com/tpc/payment/pay-by-token', tapPayData, config
            ))
        }
    }

    // const tapPayRes = await Promise.allSettled(tapPayReq)
    const paidStatusArr = response.map(res => res.data.status)
    console.log('@@', paidStatusArr)

    let updates = []
    for (let i = 0; i < autoSubList.length; i++) {
        if (paidStatusArr[i] == 0) {
            // success, update expire 
            try {
                const userId = autoSubList[i]['user_id']
                console.log('@', userId)
                setTimeout(async () => {
                    await axios.post('http://localhost:3000/api/1.0/order/autosub', { userId }, conf)
                }, 50)
            } catch (e) {
                console.error(e)
            }
        } else {
            // failed, update role_id
            try {
                const userId = autoSubList[i].user_id
                await axios.post('http://localhost:3000/api/1.0/order/autoexpire', { userId }, conf)
            } catch (e) {
                console.error(e)
            }
        }
    }
}
autoSub()
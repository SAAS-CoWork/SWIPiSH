import React, { useContext, useState, useEffect } from 'react';
import GooglePayButton from '@google-pay/button-react';
import { CartContext } from '../context/cartContext';

export default function GooglePayBtn() {
  const { pricingPlan } = useContext(CartContext);
  const [purchasedPlan, setPurchasedPlan] = useState('');
  const loginToken = localStorage.getItem('loginToken');

  function getDate() {
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function sendPaymentInfo() {
    const paymentInfo = { data: purchasedPlan };
    fetch('https://www.gotolive.online/api/1.0/order/subscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = './swipe';
        } else {
          alert('Subscription failed!');
        }
      })
      .catch((err) => console.log(err));
  }

  function handlePayment(data) {
    setPurchasedPlan({
      prime: 'testPrime',
      plan: pricingPlan.plan,
      price: Number(pricingPlan.price),
      subscription_time: getDate(),
    });
    sendPaymentInfo();
  }

  useEffect(() => {
    console.log(purchasedPlan);
  }, [purchasedPlan]);

  return (
    <GooglePayButton
      environment='TEST'
      buttonType='subscribe'
      buttonSizeMode='fill'
      style={{
        width: '240px',
        height: '70px',
        marginTop: '10px',
        alignSelf: 'center',
      }}
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Demo Merchant',
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: pricingPlan.price,
          currencyCode: 'USD',
          countryCode: 'US',
        },
        shippingAddressRequired: false,
        callbackIntents: ['PAYMENT_AUTHORIZATION'],
      }}
      onClick={() => {
        pricingPlan === ''
          ? alert('Please select a plan')
          : console.log('Paying...');
      }}
      onPaymentAuthorized={(paymentData) => {
        handlePayment(paymentData);
        return { transactionState: 'SUCCESS' };
      }}
    />
  );
}

import { useEffect, useState } from 'react';

const TAPPAY_SDK_URL = 'https://js.tappaysdk.com/tpdirect/v5.6.0';

const loadTapPaySDK = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = TAPPAY_SDK_URL;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const initializeTapPaySDK = (appKey, env) => {
  return new Promise((resolve) => {
    window.TPDirect.setupSDK(appKey, env);
    window.TPDirect.card.setup({
      fields: {
        number: {
          element: '#card-number',
          placeholder: '**** **** **** ****',
        },
        expirationDate: {
          element: '#card-expiration-date',
          placeholder: 'MM / YY',
        },
        ccv: {
          element: '#card-ccv',
          placeholder: 'CCV',
        },
      },
      styles: {
        input: {
          color: 'gray',
        },
        ':focus': {
          color: 'black',
        },
        '::placeholder': {
          color: 'gray',
        },
      },
    });
    resolve();
  });
};

initializeTapPaySDK(
  'app_KRwEWQJFkA4sFghDy9CFRrMZegwRyznZVZLY19p4x38xgSXi2NmWsKTJuQYK',
  'sandbox'
);

const Test = async () => {
  try {
    await window.TPDirect.card.getPrime((result) => {
      console.log('getPrime', result);
      // Send the prime to your server for payment processing
    });
  } catch (error) {
    console.error('getPrime', error);
  }
  return (
    <div>
      <div id='card-number'></div>
      <div id='card-expiration-date'></div>
      <div id='card-ccv'></div>
      <button>Pay</button>
    </div>
  );
};

export default Test;

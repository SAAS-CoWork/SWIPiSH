import React from 'react';
import GooglePayButton from '@google-pay/button-react';

export default function GooglePayBtn() {
  return (
    <GooglePayButton
      environment='TEST'
      buttonType='subscribe'
      buttonSizeMode='fill'
      style={{ width: '240px', height: '70px', marginTop: '10px',alignSelf: "center"
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
          totalPrice: '1',
          currencyCode: 'USD',
          countryCode: 'US',
        },
        shippingAddressRequired: false,
        callbackIntents: ['PAYMENT_AUTHORIZATION'],
      }}
      // onLoadPaymentData={(paymentRequest) => {
      //   console.log('Success', paymentRequest);
      // }}
      onPaymentAuthorized={(paymentData) => {
        console.log('Payment Authorised Success', paymentData);
        return { transactionState: 'SUCCESS' };
      }}
    />
  );
}

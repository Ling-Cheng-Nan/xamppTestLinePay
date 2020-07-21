// import packages
const uuid = require('uuid4');
const crypto = require('crypto-js');
const axios = require('axios');
const LinePay = require('line-pay-v3');

// setting parameters
let YOUR_CHANNEL_ID = '1654408528';
let YOUR_CHANNELSECRET = 'c27ac8fab043fad2ed54f9f6a5c37f2f';
let uri = 'https://sandbox-api-pay.line.me';
let requestUri = '/v3/payments/request';
let nonce = uuid();


// header
const linePay = new LinePay({
    channelId: YOUR_CHANNEL_ID,
    channelSecret: YOUR_CHANNELSECRET,
    uri: 'https://sandbox-api-pay.line.me'
})

//prepare an arbitary order

const order = {
    "amount": 100,
    "currency": "TWD",
    "orderId": "MKSI_S_20180904_1000001",
    "packages": [
        {
            "id": "1",
            "amount": 100,
            "products": [
                {
                    "id": "PEN-B-001",
                    "name": "TEST PRODUCT",
                    "imageUrl": "https://img.shopping.friday.tw/images/product/235/7061302/7061302_3_1.jpg?671963",
                    "quantity": 2,
                    "price": 50
                }
            ]
        }
    ],
    "redirectUrls": {
        "confirmUrl": "http://140.120.14.210/nodetest/payment/authorize.html",
        "cancelUrl": "http://140.120.14.210/nodetest/payment/cancel.html"
    }
}

// linePay.request(order).then(res => {console.log(res)});

//encrypted HMAC-Base64 Signature formula
let encrypt = crypto.HmacSHA256(YOUR_CHANNELSECRET + requestUri + JSON.stringify(order) + nonce, YOUR_CHANNELSECRET)

//transform into base64
let hmacBase64 = crypto.enc.Base64.stringify(encrypt)

//HTTP request header configuration
let configs = {
    headers: {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': YOUR_CHANNEL_ID,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': hmacBase64
    }
}


console.log("Channel Id: " + YOUR_CHANNEL_ID)
console.log("Channel Secret Key" + YOUR_CHANNELSECRET)
console.log("URI : " + uri)
console.log("Request URI: " + requestUri)
console.log("Nonce : " + nonce)
console.log("HMAC Base64 : " + hmacBase64)
var reservedUrl = '';

axios.post('https://sandbox-api-pay.line.me/v3/payments/request', order, configs).then(res => {
    // lineUrl = res.data.info.paymentUrl.web;
    console.log(res.data);
    reservedUrl = res.data.info.paymentUrl.web;
    console.log('web url => ', reservedUrl);
});


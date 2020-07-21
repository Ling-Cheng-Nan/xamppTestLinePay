// import packages
const uuid = require('uuid4')
const crypto  = require('crypto-js')
const axios   = require('axios')
const LinePay = require('line-pay-v3')

// setting parameters
let YOUR_CHANNEL_ID = '1654408528';
let YOUR_CHANNELSECRET = 'c27ac8fab043fad2ed54f9f6a5c37f2f';
let uri = 'https://sandbox-api-pay.line.me';
let requestUri = '/v3/payments/request';
let nonce = uuid()

const order1 = {
    "amount" : 100,
    "currency" : "TWD",
    "orderId" : "MKSI_S_20180904_1000001",
    "packages" : [
        {
            "id" : "1",
            "amount": 100,
            "products" : [
                {
                    "id" : "PEN-B-001",
                    "name" : "Pen Brown",
                    "imageUrl" : "https://pay-store.line.com/images/pen_brown.jpg",
                    "quantity" : 2,
                    "price" : 50
                }
            ]
        }
    ],
    "redirectUrls" : {
        "confirmUrl" : "https://pay-store.line.com/order/payment/authorize",
        "cancelUrl"  : "https://pay-store.line.com/order/payment/cancel"
    }
}


POST https://sandbox-api-pay.line.me/v2/payments/oneTimeKeys/pay HTTP/1.1
Host: sandbox-api-pay.line.me
Content-Type: application/json
X-LINE-ChannelId: {channel id}
X-LINE-ChannelSecret: {channel secret}
X-LINE-MerchantDeviceType: POS
X-LINE-MerchantDeviceProfileId: DUMMY

{
    "productName": "test product",
    "amount": 100,
    "currency": "TWD",
    "orderId": "merchant_test_order_1",
    "oneTimeKey": "123456789012"
}
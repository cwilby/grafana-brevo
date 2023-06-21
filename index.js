const express = require('express');
const morgan = require('morgan');
const Brevo = require('@getbrevo/brevo');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.post('/send-sms', async (req, res) => {
    Brevo.ApiClient.instance.authentications['api-key'].apiKey = req.query.apiKey;
    
    const sendTransacSms = new Brevo.SendTransacSms();
    sendTransacSms.sender = 'PinnacleSMS';
    sendTransacSms.recipient = req.query.recipient;
    sendTransacSms.content = req.body.message;

    await new Brevo.TransactionalSMSApi().sendTransacSms(sendTransacSms);

    res.status(201).send();
});

const port = process.env.PORT || 32012;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
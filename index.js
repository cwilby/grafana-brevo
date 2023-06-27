const express = require('express');
const morgan = require('morgan');
const Brevo = require('@getbrevo/brevo');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('It\'s working!'));
app.post('/send-sms', async (req, res) => {
    try {
        Brevo.ApiClient.instance.authentications['api-key'].apiKey = req.query.apiKey;
        
        const observedAt = new Date(Date.parse(req.body.alerts[0].startsAt)).toISOString();
        const notificationDeliveredAt = new Date().toISOString();
        const observedSecondsAgo = Math.round((new Date(notificationDeliveredAt) - new Date(observedAt)) / 1000);

        const sendTransacSms = new Brevo.SendTransacSms();
        sendTransacSms.sender = 'PinnacleSMS';
        sendTransacSms.recipient = req.query.number;
        sendTransacSms.content = `${req.body.message}\n\nObserved ${observedSecondsAgo}s before this notification was delivered, at ${notificationDeliveredAt}`;
    
        await new Brevo.TransactionalSMSApi().sendTransacSms(sendTransacSms);
    
        res.status(201).send();
    } catch (e) {
        res.status(500).json({
            message: e.message
        });

        const errorPath = path.resolve(__dirname, 'error.log');

        if (!fs.existsSync(errorPath)) fs.writeFileSync(errorPath, '');

        fs.appendFileSync(errorPath, `${new Date().toISOString()} - ${e.message}\n`);
    }
});

const port = process.env.PORT || 32012;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
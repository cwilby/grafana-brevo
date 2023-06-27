const express = require('express');
const morgan = require('morgan');
const Brevo = require('@getbrevo/brevo');
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('It\'s working!'));
app.post('/send-sms', async (req, res) => {
    try {
        Brevo.ApiClient.instance.authentications['api-key'].apiKey = req.query.apiKey;

        const brevo = new Brevo.TransactionalSMSApi();

        for (let alert of req.body.alerts) {
            const sendTransacSms = new Brevo.SendTransacSms();
            sendTransacSms.sender = 'PinnacleSMS';
            sendTransacSms.recipient = req.query.number;
            sendTransacSms.content = buildContent(alert);
        
            await brevo.sendTransacSms(sendTransacSms);
        }
    
        res.status(201).send();
    } catch (e) {
        res.status(500).json({ message: e.message });

        const errorPath = path.resolve(__dirname, 'error.log');

        if (!fs.existsSync(errorPath)) fs.writeFileSync(errorPath, '');

        fs.appendFileSync(errorPath, `${new Date().toISOString()} - ${e.message}\n`);
    }
});

function buildContent(alert) {
    const description = Object.values(alert.annotations)[0];
    const value = JSON.stringify(alert.values);
    const silenceUrl = alert.silenceURL;
    const observedAt = dayjs(alert.startsAt).format('YYYY-MM-DD HH:mm:ss Z');
    const notificationDeliveredAt = dayjs().format('YYYY-MM-DD HH:mm:ss Z');
    const observedSecondsAgo = dayjs(notificationDeliveredAt).diff(observedAt, 'seconds');

    let content = '';

    content += `Alert: ${description}\n\n`;

    if (value) {
        content += `Value: ${value}\n\n`;
    } else {
        content += `Value: No value\n\n`;
    }

    content += `Silence: ${silenceUrl}\n\n`;

    content += `Observed ${observedSecondsAgo}s before this notification was delivered, at ${notificationDeliveredAt}`;

    return content;
}

const port = process.env.PORT || 32012;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const Twilio = require('twilio');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => res.send('It\'s working!'));
app.post('/send-sms', async (req, res) => {
    try {
        const { data: { twilioAccountNumber, twilioFromNumber, twilioToNumber, twilioToken } } = await axios.post(
            'http://127.0.0.1:1880/twilio-credentials',
            process.env.NODERED_TOKEN,
            { headers: { 'content-type': 'text/plain' } }
        );

        const client = Twilio(twilioAccountNumber, twilioToken);
        
        const recipients = (req.query.to || twilioToNumber).split(',');

        for (let recipient of recipients) {
            for (let alert of req.body.alerts) {
                await client.messages.create({
                    from: twilioFromNumber,
                    to: recipient,
                    body: buildContent(alert),
                })
            }
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
    const notificationDeliveredAt = dayjs();
    const observedSecondsAgo = notificationDeliveredAt.diff(alert.startsAt, 'seconds');
    const value = buildValue(alert);

    let content = '';
    content += alert.status === 'firing' ? 'FIRING\n\n' : 'RESOLVED\n\n';
    content += alert.annotations ? `Alert: ${Object.values(alert.annotations)[0]}\n\n` : ``;
    content += value && value !== 'null' ? `Value: ${value}\n\n` : 'No values\n\n';
    content += `Panel: ${alert.panelURL}\n\n`;
    content += `Silence: ${alert.silenceURL}\n\n`;
    content += `Observed ${observedSecondsAgo}s before this notification was delivered, at ${notificationDeliveredAt}`;
    return content;
}

function buildValue(alert) {
    if (alert.values instanceof Array) {
        return JSON.stringify(alert.values);
    }
    if (typeof alert.values === 'object' && alert.values) {
        return Object.values(alert.values).join(', ');
    }
    if (!alert.values) {
        return null;
    }
    return JSON.stringify(alert.values);
}

const port = process.env.PORT || 32012;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

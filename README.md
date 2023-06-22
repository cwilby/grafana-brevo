# grafana-brevo

## Setup

First, open a terminal and enter the following commands to start this service:
```bash
$ git clone git@github.com:cwilby/grafana-brevo /usr/local/share/grafana-brevo
$ cd /usr/local/share/grafana-brevo
$ npm install
$ npm start
```

Next, configure a Webhook alert in Grafana with the following settings:

* **Integration**: Webhook
* **URL**: http://127.0.0.1:32012/send-sms?number={number}&apiKey={brevoApiKey}
* **HTTP Method**: POST


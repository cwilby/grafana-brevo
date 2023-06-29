# grafana-sms

## Install

First, configure a Webhook alert in Grafana with the following settings:

* **Integration**: Webhook
* **URL**: http://127.0.0.1:32012/send-sms?to={number}
* **HTTP Method**: POST

Next, clone this repository and install npm dependencies:

```bash
$ mkdir /usr/local/share/grafana-sms
$ sudo chown $(whoami): /usr/local/share/grafana-sms
$ cd /usr/local/share/grafana-sms
$ git clone https://github.com/cwilby/grafana-sms.git .
$ npm install
```

Once installed, copy `.env.example` to `.env` to add Twilio credentials:

```bash
$ cp .env.example .env
$ nano .env
```
```env
TWILIO_ACCOUNT_SID={account_sid}
TWILIO_AUTH_TOKEN={token}
TWILIO_FROM_NUMBER={twilio number}
```

Once configured, start the service using the script provided:

```bash
$ ./setup-service.sh
```
# grafana-brevo

## Install

```bash
# Create a directory for the app
$ mkdir /usr/local/share/grafana-brevo
$ sudo chown pinnacle: /usr/local/share/grafana-brevo

# Clone the repository to that directory
$ git clone https://github.com/cwilby/grafana-brevo.git /usr/local/share/grafana-brevo

# Install dependencies and setup service
$ cd /usr/local/share/grafana-brevo
$ npm install
$ ./setup-service.sh
```

Configure a Webhook alert in Grafana with the following settings:

* **Integration**: Webhook
* **URL**: http://127.0.0.1:32012/send-sms?number={number}&apiKey={brevoApiKey}
* **HTTP Method**: POST


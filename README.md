# grafana-brevo

## Setup

1.  Clone this repository to a server running Grafana
2.  Open the folder in a terminal and run `npm start` to start this service.
3.  In Grafana, configure an alert with the following settings:

* **Integration**: Webhook
* **URL**: http://127.0.0.1:32012/send-sms?number={number}&apiKey={brevoApiKey}
* **HTTP Method**: POST


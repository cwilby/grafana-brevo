# grafana-sms

## Grafana Settings
* **Integration**: Webhook
* **URL**: http://127.0.0.1:32012/send-sms?number={number}
* **HTTP Method**: POST

## Installation

First, download this project to the server using the following commands:

```
$ mkdir /usr/local/share/grafana-sms
$ sudo chown $(whoami): /usr/local/share/grafana-sms
$ cd /usr/local/share/grafana-sms

# With git
$ git clone https://github.com/cwilby/grafana-sms .

# With wget
$ wget https://github.com/cwilby/grafana-sms/archive/refs/heads/main.zip
$ unzip main.zip && rm main.zip 
$ mv grafana-sms-main/* . && rmdir grafana-sms-main
```

Next, run the `install.sh` script to install the project.  This will ask for your Twilio credentials and install the project as a systemd service.

```bash
$ ./install.sh
```
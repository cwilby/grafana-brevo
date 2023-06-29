#!/bin/bash

sudo cp /usr/local/share/grafana-sms/grafana-sms.service /etc/systemd/system/grafana-sms.service
sudo systemctl start grafana-sms
sudo systemctl enable grafana-sms
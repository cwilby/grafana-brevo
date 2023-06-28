#!/bin/bash

sudo cp /usr/local/share/grafana-brevo/grafana-brevo.service /etc/systemd/system/grafana-brevo.service
sudo systemctl start grafana-brevo
sudo systemctl enable grafana-brevo
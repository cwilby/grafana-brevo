#!/bin/bash

cp ./grafana-brevo.service /etc/systemd/system/grafana-brevo.service
systemctl start grafana-brevo
systemctl enable grafana-brevo
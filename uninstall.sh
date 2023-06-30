#!/bin/bash

sudo systemctl stop grafana-sms
sudo systemctl disable grafana-sms
systemctl daemon-reload
systemctl reset-failed
#!/bin/bash

## ask for the user's twilio credentials and store them in a variable
read -p "Enter your Twilio Account SID: " account_sid
read -p "Enter your Twilio Auth Token: " token
read -p "Enter your Twilio Phone Number: " twilio_number

## create a .env file and store the user's credentials in it
echo "TWILIO_ACCOUNT_SID=$account_sid" > .env
echo "TWILIO_AUTH_TOKEN=$token" >> .env
echo "TWILIO_FROM_NUMBER=$twilio_number" >> .env

## install the required packages
npm install

sudo cp grafana-sms.service /etc/systemd/system/grafana-sms.service
sudo systemctl start grafana-sms
sudo systemctl enable grafana-sms

echo "Installation complete, testing:"
echo ""
curl http://localhost:32012
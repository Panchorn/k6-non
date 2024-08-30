# k6-non

## Installation
$ brew install k6

Ps. You may need to install node first

## Start InfluxDB and Grafana
$ docker-compose up -d

## Run Tests
$ k6 run ./scripts/api_transfer.js -e K6_OUT=influxdb=http://localhost:8086/k6
$ k6 run ./scripts/api_get_transactions.js -e K6_OUT=influxdb=http://localhost:8086/k6

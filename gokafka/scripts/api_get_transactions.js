import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
    vus: 10,
    duration: "10s",
}

export default function () {
    const url = 'http://localhost:8000/transfers/transactions'
    const headers = {
        headers: { Accepts: "application/json" },
    }
    const response = http.get(url, headers)
    check(response, { "status is 200": (r) => r.status === 200 })
    sleep(0.3)
}

// RUN script by
// k6 run ./scripts/{file_name}.js -o influxdb=http://localhost:8086/k6

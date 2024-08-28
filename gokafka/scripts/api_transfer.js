import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
    // stages: [
    //     // Ramp-up from 1 to 5 virtual users (VUs) in 5s
    //     { duration: "5s", target: 5 },

    //     // Stay at rest on 5 VUs for 10s
    //     { duration: "5s", target: 5 },

    //     // Ramp-down from 5 to 0 VUs for 5s
    //     { duration: "5s", target: 0 },
    // ],

    vus: 10,
    duration: "10s",
    // iterations: 1000,
    // rampUp: "1s",
};

export default function () {
    const round = Date.now().toString(36)
    const iteration = Math.random().toString(36).substring(2)
    const url = 'http://localhost:8000/transfers';
    const payload = JSON.stringify({
        "refId": "K6-" + round + "-" + iteration,
        "fromID": "2",
        "toID": "3",
        "amount": 1000,
        "secretToken": iteration
    });
    const headers = {
        headers: { Accepts: "application/json" },
    }
    const response = http.post(url, payload, headers);
    check(response, { "status is 200": (r) => r.status === 200 });
    sleep(0.3);
}

// RUN script by
// k6 run ./scripts/{file_name}.js -o influxdb=http://localhost:8086/k6

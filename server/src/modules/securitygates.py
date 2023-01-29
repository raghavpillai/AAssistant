import requests
import json
import bisect

SECONDS_IN_DAY = 86400

class SecurityGates:
    security_gates: dict = {
        "General": {},
        "Priority": {}, 
        "TSA Pre-Check": {}
    }
    @classmethod
    def fetch_gates(cls):
        headers: dict = {
            'authority': 'api.dfwairport.mobi',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'api-key': '87856E0636AA4BF282150FCBE1AD63DE',
            'api-version': '150',
            # 'content-length': '0',
            'origin': 'https://www.dfwairport.com',
            'referer': 'https://www.dfwairport.com/',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        }

        response = requests.post('https://api.dfwairport.mobi/checkpoints/get', headers=headers)
        wait_data = json.loads(response.content)

        data = wait_data["data"]
        response_status = wait_data["status"]
        checkpoints = data["checkpoints"]
        lanes = data["lanes"]

        for gate in checkpoints:
            match gate["lane"]:
                case "General":
                    cls.security_gates["General"][gate["name"]] = gate
                case "TSA Pre":
                    cls.security_gates["TSA Pre-Check"][gate["name"]] = gate
                case "Priority":
                    cls.security_gates["Priority"][gate["name"]] = gate
    
    @classmethod
    def get_time(cls, gate, departure_time, boarding_type="General"):
        if not isinstance(departure_time, int):
            return []
        # departure_time is in unix time, seconds since 1970
        # first fix departure_time so that it's the same day or whatever as the wait times in the security gates
        departure_time %= SECONDS_IN_DAY
        gate_letter = gate[0]

        possible_gates = [x for x in cls.security_gates[boarding_type].keys() if x[0] == gate_letter and cls.security_gates[boarding_type][x]["open"]]
        gate_times = {}
        for x in possible_gates:
            gate_times[x] = cls.get_gate_time(x, departure_time, boarding_type) + abs(int(x[1:]) - int(gate[1:]))
        #convert this dictionary into an array sorted by value
        gate_times = sorted(gate_times.items(), key=lambda x: x[1])
        #convert gate_times to a list of lists
        gate_times = [[x[0], x[1]] for x in gate_times]
        return gate_times

    @classmethod
    def get_gate_time(cls, gate, departure_time, boarding_type="General"):
        waitTimePredictions = cls.security_gates[boarding_type][gate]["waitTimePredictions"]
        waitTimePredictions = [x for x in waitTimePredictions if not x["closed"]]

        waitTimePredictions.sort(key=lambda x: x["slotTimestamp"])

        binary_searchable_wait_times = [x["slotTimestamp"] % SECONDS_IN_DAY for x in waitTimePredictions]
        security_wait_time = waitTimePredictions[bisect.bisect_left(binary_searchable_wait_times, departure_time) % len(waitTimePredictions)]["waitMinutes"]
        return security_wait_time

if __name__ == "__main__":
    SecurityGates.fetch_gates()
    for i in range(0, 10):
        print(SecurityGates.get_time("E9", 1600000000 + 900 * i))
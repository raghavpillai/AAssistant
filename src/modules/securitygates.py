import requests
import json

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
    

SecurityGates.fetch_gates()
#print(SecurityGates.security_gates)
#print(security_gates)

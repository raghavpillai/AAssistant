import requests
import json
import bisect

SECONDS_IN_DAY: int = 86400

class SecurityGates:
    """
    Class to compute wait and travel times given gates, taking into account security and transit times
    """
    security_gates: dict = {
        "General": {},
        "Priority": {}, 
        "TSA Pre-Check": {}
    }


    @classmethod
    def fetch_gates(cls) -> None:
        """
        Function to get and format wait times for gates across different times of day
        """
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
        wait_data: dict = json.loads(response.content)

        data: dict = wait_data["data"]
        response_status: dict = wait_data["status"]
        checkpoints: dict = data["checkpoints"]
        lanes: dict = data["lanes"]

        for gate in checkpoints:
            match gate["open"]:
                case "General":
                    cls.security_gates["General"][gate["name"]] = gate
                case "TSA Pre":
                    cls.security_gates["TSA Pre-Check"][gate["name"]] = gate
                case "Priority":
                    cls.security_gates["Priority"][gate["name"]] = gate
    

    @classmethod
    def get_time(cls, gate: str, departure_time: int, boarding_type: str="General") -> list:
        """
        Gets time required to go through each security checkin in the terminal
        @param gate[str]: Gate that flight departs from
        @param departure_time[str]: Departure time of flight
        @param boarding_type[str]: Security priority type [General, Priority, TSA-Pre]
        @return[list] 2D list of gates to times
        """
        if not isinstance(departure_time, int):
            return []
        # departure_time is in unix time, seconds since 1970
        # first fix departure_time so that it's the same day or whatever as the wait times in the security gates
        departure_time %= SECONDS_IN_DAY
        gate_letter: str = gate[0]

        possible_gates: list = [x for x in cls.security_gates[boarding_type].keys() if x[0] == gate_letter and cls.security_gates[boarding_type][x]["open"]]
        gate_times: dict = {}

        for x in possible_gates:
            gate_times[x] = cls.get_gate_time(x, departure_time, boarding_type) + abs(int(x[1:]) - int(gate[1:])) # 1 minute for each gate away

        #convert this dictionary into an array sorted by value
        gate_times: list = sorted(gate_times.items(), key=lambda x: x[1])

        #convert gate_times to a list of lists
        gate_times: list = [[x[0], x[1]] for x in gate_times]
        return gate_times or [gate, 17.125]


    @classmethod
    def get_gate_time(cls, gate: str, departure_time: int, boarding_type: str="General") -> int:
        """
        Function to get security wait time for specific security terminals
        @param gate[str]: Gate that flight departs from
        @param departure_time[int]: Departure time of flight
        @param boarding_type[str]: Security priority type [General, Priority, TSA-Pre]
        @return[str]: Returns minutes of wait time at security terminal
        """
        waitTimePredictions: list = cls.security_gates[boarding_type][gate]["waitTimePredictions"]
        waitTimePredictions: list = [x for x in waitTimePredictions if not x["closed"]]

        waitTimePredictions.sort(key=lambda x: x["slotTimestamp"])

        binary_searchable_wait_times: list = [x["slotTimestamp"] % SECONDS_IN_DAY for x in waitTimePredictions]
        security_wait_time: int = waitTimePredictions[bisect.bisect_left(binary_searchable_wait_times, departure_time) % len(waitTimePredictions)]["waitMinutes"]
        return security_wait_time


    @classmethod
    def get_travel_time(cls, cur_loc: list) -> str:
        """
        Gets travel time from current location to DFW
        @param cur_loc[list]: Current location in format [lat, long]
        @return[str] Returns hours and minutes of drive time to DFW
        """
        # cur_loc is a tuple of [lat, long]
        params: dict = {
            'origins': f"{str(cur_loc[0])},{str(cur_loc[1])}",
            'destinations': "32.906005,-97.039366",
            'key': 'AIzaSyBJ6AqAaKcN_gasy2YE2DcRQm77Ip-KBkc',
        }
        headers: dict = {
            "Accept-Language": "en-US,en;q=0.5"
        }

        response = requests.get('https://maps.googleapis.com/maps/api/distancematrix/json', params=params, headers=headers)
        return response.json()['rows'][0]['elements'][0]['duration']['value']


    @classmethod
    def get_departure_info(cls, boarding_time: int) -> list:
        """
        Function to get departure info
        @param departure_time[int]: Boarding time of flight, unix time in seconds
        """
        travel_time_to_checkpoint = SecurityGates.get_travel_time([30.624804, -96.331321])/60 # Convert to mins from seconds
        checkpoint_to_gate_time = SecurityGates.get_time("E9", boarding_time)[1]
        total_time_to_gate = travel_time_to_checkpoint + checkpoint_to_gate_time # Time in mins
        time_to_leave = boarding_time - (total_time_to_gate*60)

        return [True, {
            "travel_time_to_checkpoint": travel_time_to_checkpoint,
            "checkpoint_to_gate_time": checkpoint_to_gate_time,
            "total_time_to_gate": total_time_to_gate,
            "time_to_leave": time_to_leave # Unix time in seconds
        }]



if __name__ == "__main__":
    print(SecurityGates.get_departure_info(1674982887 + 43200))
    #print(SecurityGates.get_travel_time([30.624804, -96.331321]))
    #print(SecurityGates.get_time("E9", 1600000000 + 900))
    exit()
    SecurityGates.fetch_gates()
    for i in range(0, 10):
        print(SecurityGates.get_time("E9", 1600000000 + 900 * i))
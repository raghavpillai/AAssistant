user_data = {
    "admin_acc": {
        "id": 67701,
        "password": "test_password",
        "level": "admin",
        "flight_num": None
    },
    "user_acc": {
        "id": 67702,
        "password": "test_password",
        "level": "user",
        "flight_num": "AA 1511"
    }
}

class User(object):

    def __init__(self, level, username, id):
        self.admin_level = level
        self.username = username
        self.password = ""
        self.id = id
        
        self.bags = []
        self.ticket_number = ""
        self.flight_number = ""
        self.seat_number = ""

        self.status = ""
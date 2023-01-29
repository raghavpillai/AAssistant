from src.modules.persistence import Persistence, user_db

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
    __initialized = False

    def __setattr__(self, key, value):
        super(User, self).__setattr__(key, value)
        if self.__initialized == True and key != "_User__initialized":
            Persistence.update_collection(user_db, self.username, {key: value})


    def __init__(self, username: str, password: str, level: str, id: int):
        self.admin_level = level
        self.username = username
        self.password = password
        self.id = id
        
        self.bags = []
        self.ticket_number = ""
        self.flight_number = ""
        self.seat_number = ""

        self.status = ""

        Persistence.update_collection(
            user_db,
            self.username,
            {
                "id": self.id,
                "password": self.password,
                "level": self.admin_level,
                "flight_num": self.flight_number,
                "bags": self.bags,
                "ticket_number": self.ticket_number,
                "flight_number": self.flight_number,
                "seat_number": self.seat_number,
                "status": self.status
            }

        )

        self.__initialized = True
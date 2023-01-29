from src.modules.persistence import Persistence, user_db

user_data = {
    "admin_acc": {
        "id": 67701,
        "password": "test_password",
        "level": "admin",
        "flight_num": None,
        "name": "Admin User"
    },
    "user_acc": {
        "id": 67702,
        "password": "test_password",
        "level": "user",
        "flight_num": "AA 1511",
        "name": "Normal User"
    }
}

class User(object):
    __initialized = False

    def __setattr__(self, key, value):
        super(User, self).__setattr__(key, value)
        if self.__initialized == True and key != "_User__initialized":
            Persistence.update_collection(user_db, self.username, {key: value})


    def __init__(self, username: str, password: str, level: str, id: int, full_name: str):
        self.admin_level = level
        self.username = username
        self.password = password
        self.id = id
        self.full_name = full_name
        
        self.bags = []
        self.ticket_number = ""
        self.flight_number = ""
        self.seat_number = ""

        self.status = "unconfirmed"

        Persistence.update_collection(
            user_db,
            self.username,
            {
                "id": self.id,
                "password": self.password,
                "full_name": self.full_name,
                "level": self.admin_level,
                "bags": self.bags,
                "ticket_number": self.ticket_number,
                "flight_number": self.flight_number,
                "seat_number": self.seat_number,
                "status": self.status
            }
        )

        self.__initialized = True
class Flight():
    # equivalent to constructor function
    def __init__(self, flight_name, capacity):
        self.capacity = capacity
        self.passengers = []
        self.flight_name = flight_name
    
    def add_passenger(self, name):
        if not self.open_seats():
            return False
        else:
            self.passengers.append(name)
            return True
        
    def open_seats(self):
        return self.capacity - len(self.passengers)
    
    def get_name(self):
        return self.flight_name
    
    
# creating a flight named A1 with capacity of 3 seats
A1 = Flight("A1", 3)

people = ["Alice", "Bob", "Charlie", "David"]

for person in people:
    if A1.add_passenger(person):
        print(f"Added {person} to the flight {A1.get_name()} successfully")
    else:
        print(f"No available seats for {person} on the flight {A1.get_name()}")

    
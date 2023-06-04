from dataclasses import dataclass, asdict
import json 

@dataclass
class Dish:
    name: str
    price: int
    image: str
    description: str 
    mass: int
    avaiable: bool

class Menu:
    def __init__(self, *dishes):
        self.dishes = list(dishes)
        if self.dishes == []:
           with open(r'data/menu/avaiable.json', 'r') as f:
                self.dishes = json.load(f) 

    def add(self, dish: Dish):
        self.dishes.append(dish)

    def remove(self, dish: Dish):
        self.dishes.remove(dish)

    def serialize(self):
        with open(r'data/menu/avaiable.json', 'w') as f:
            json.dump([asdict(dish) for dish in self.dishes], f)
        
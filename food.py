from dataclasses import dataclass, asdict
import json 
import os 

@dataclass
class Dish:
    name: str
    dish_type: str
    price: int
    image: str
    description: str 
    mass: int
    avaiable: bool

class DishCollection:
    def __init__(self):
        if not os.path.exists(self.path): open(self.path, 'w').close()
        
        if self.dishes == []:
           with open(self.path, 'r', encoding='utf-8') as f:
                self.dishes = json.load(f)

    def add(self, dish: dict):
        if dish['name'] not in [d['name'] for d in self.dishes]:
            self.dishes.append(dish)
            return True
        
        return False

    def remove(self, dish: dict):
        if dish['name'] in [d['name'] for d in self.dishes]:
            self.dishes.remove(dish)
            return True

        return False
    
    def serialize(self):
        with open(self.path, 'r', encoding='utf-8') as f:
            prev = f.read()

        with open(self.path, 'w', encoding='utf-8') as f:
            try:
                write = json.dumps([dish for dish in self.dishes], indent=2, ensure_ascii=False)
                f.write(write)
            except Exception as e: 
                print(e)
                f.write(prev)

class Menu(DishCollection):
    def __init__(self, *dishes):
        self.path = r'data/menu/menu.json'
        self.dishes = list(dishes)
        super().__init__()

class Feed(DishCollection):
    def __init__(self, *dishes):
        self.path = r'data/feed/feed.json'
        self.dishes = list(dishes)
        super().__init__()
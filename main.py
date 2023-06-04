from flask import *
from food import *

app = Flask(__name__)

default_food = [Dish('Хачапури', 120, 'хачапури.jpg', 'Вкусная темка', 700, True), Dish('Лагман', '290', 'лагман.jpg', 'Тоже вкусная темка', 810, False)]
#menu = Menu(*default_food)
menu = Menu()

@app.route('/food/all', methods=['GET'])
def all_food():
    return menu.dishes, 200

@app.route('/food/avaiable', methods=['GET'])
def avaiable_food():
    return list(filter(lambda d: d['avaiable'], menu.dishes)), 200

if __name__ == '__main__':
    print(menu.dishes)
    app.run('0.0.0.0')
    #menu.serialize()

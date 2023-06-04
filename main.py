from flask import *
from food import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

default_food = [Dish('Хачапури', 120, 'хачапури.jpg', 'Вкусная темка', 700, True), Dish('Лагман', '290', 'лагман.jpg', 'Тоже вкусная темка', 810, False)]
# menu = Menu(*default_food)
menu = Menu()
# menu.serialize()
feed = Feed()
# feed.serialize()

@app.route('/food/all', methods=['GET'])
def all_food():
    return menu.dishes, 200

@app.route('/food/avaiable', methods=['GET'])
def avaiable_food():
    return list(filter(lambda d: d['avaiable'], menu.dishes)), 200

@app.route('/food/add', methods=['POST'])
def add_dish():
    res = menu.add(request.get_json())
    menu.serialize()
    return ('Ok', 200) if res else ('Dish exists', 409)

@app.route('/food/remove', methods=['POST'])
def remove_dish():
    js = request.get_json()
    print(js)
    res = menu.remove(js)
    menu.serialize()
    return ('Ok', 200) if res else ('Dish doesn\'t exist', 409)

@app.route('/content/feed', methods=["GET"])
def get_feed():
    d = feed.dishes[0]
    print(*feed.dishes)
    return list(filter(lambda d: d['avaiable'], feed.dishes)), 200

@app.route('/content/feed/set', methods=["POST"])
def set_feed():
    feed.dishes = request.get_json()
    feed.serialize()
    return 'Ok', 200

if __name__ == '__main__':
    print(menu.dishes)
    app.run('0.0.0.0')
    #menu.serialize()

import express, { Express } from 'express';
import Collection from './serializable_collection';
import { FeedFood, MenuFood } from './food';
import { ok } from 'assert';
import bodyParser from 'body-parser';
import { Order } from './order';

const app = express();
app.use(bodyParser.json())
const port = 5000;
const menu = new Collection<MenuFood>('data/menu.json');
const feed = new Collection<FeedFood>('data/feed.json');
const orders = new Collection<Order>('data/orders.json');

app.get('/', (req, res) => {
    res.send(`Avaiable methods:\n
    /food/get\n
    /food/add\n
    /food/remove\n
    /content/feed\n
    /content/feed/set\n
    /order/get\n
    /order/add`)
})

app.get('/food/get', (req, res) => {
    res.send(JSON.stringify(menu.data))
})

app.post('/food/add', (req, res) => {
    const ret = menu.add(req.body as MenuFood)
    if (!ret) {
        res.send('Food already exists');
        return;
    }
    menu.serialize()
    res.send('OK')
})

app.post('/food/remove', (req, res) => {
    const ret = menu.remove(req.body as MenuFood);
    if (!ret){
        res.send('Food doesn\'t exitst');
        return;
    }
    menu.serialize();
    res.send('OK');
})

app.get('/content/feed', (req, res) => res.send(JSON.stringify(feed.data)));

app.post('/content/feed/set', (req, res) => {
    feed.data = req.body as FeedFood[];
    feed.serialize();
    res.send("OK");
})

app.get('/order/get', (req, res) => {
    if (req.query.id === undefined && req.query.ids == undefined)
        res.send(JSON.stringify(orders.data))
    else if (req.query.ids === undefined)
        res.send(JSON.stringify(orders.data.filter(e => e.order_id == req.query.id)))
    else
        res.send(JSON.stringify(orders.data.filter(e => req.query.ids?.toString().includes(e.order_id))))
})

app.post('/order/add', (req, res) => {
    if ([req.body.name, req.body.phone, req.body.adress].includes(undefined) ||
            /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.exec(req.body.phone) === null){
        res.send("Invalid parameters")
        return;
    }

    if (req.body.phone[0] != '+') req.body.phone = '+7' + req.body.phone.substring(1)
    const order = new Order(req.body.name, req.body.phone, req.body.adress, 'CREATED');
    while (orders.ids().includes(order.order_id)) order.assign_id();

    const ret = orders.add(order)
    if (!ret) {
        res.send('Order already exists');
        return;
    }
    orders.serialize()
    res.send(order.order_id)
})

app.post('/order/state/update', (req, res) => {
    let id = req.body.order_id;
    if (id === undefined) id = req.query.id;

    const new_state = req.body.new_state;

    if ([id, new_state].includes(undefined)) {
        res.send("Invalid parameters (order_id: number and new_state: string fields must be specified)")
        return;
    }

    const order = orders.data.find(e => e.order_id == id);
    if (order === undefined) {
        res.send("No order with such id");
        return;
    }

    order.state = new_state
    orders.serialize()
    res.send('OK')
})

app.listen(port, () => {
    console.log(`⚡ Сервер запущен на порте ${port}`)
})

// @app.route('/food/get', methods=['GET'])
// @app.route('/food/add', methods=['POST'])
// @app.route('/food/remove', methods=['POST'])
// @app.route('/content/feed', methods=["GET"])
// @app.route('/content/feed/set', methods=["POST"])
// @app.route('/order/get', methods=["GET"])
// @app.route('/order/add', methods=["POST"])

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serializable_collection_1 = __importDefault(require("./serializable_collection"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const order_1 = require("./order");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/images', express_1.default.static('img'));
app.use(body_parser_1.default.json());
const port = 5000;
const menu = new serializable_collection_1.default('data/menu.json');
const feed = new serializable_collection_1.default('data/feed.json');
const orders = new serializable_collection_1.default('data/orders.json');
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', (socket) => { io.emit('connection'); });
app.get('/food/get', (req, res) => {
    var _a, _b;
    let filter = req.query.type;
    let resp = menu.data;
    if (filter === undefined)
        filter = '';
    else if (filter.toString().includes('/'))
        resp = resp.filter(food => food.identifier === filter.toString());
    else
        resp = resp.filter(food => food.identifier.split('/')[0] == filter.toString().split('/')[0]);
    let avaiable;
    if (((_a = req.query.avaiable) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) == 'false')
        avaiable = false;
    if (((_b = req.query.avaiable) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase()) == 'true')
        avaiable = true;
    if (req.query.avaiable !== undefined)
        resp = resp.filter(food => food.avaiable === avaiable);
    res.send(JSON.stringify(resp));
});
app.post('/food/close/', (req, res) => {
    const type = req.body.type;
    if (type === undefined) {
        res.send("Invalid parameters (type: string)");
        return;
    }
    menu.data.map(food => {
        if (food.identifier === type)
            food.avaiable = false;
    });
    menu.serialize();
    res.send('OK');
});
app.post('/food/open/', (req, res) => {
    const type = req.body.type;
    if (type === undefined) {
        res.send("Invalid parameters (type: string)");
        return;
    }
    menu.data.map(food => {
        if (food.identifier === type)
            food.avaiable = true;
    });
    menu.serialize();
    res.send('OK');
});
app.post('/food/add', (req, res) => {
    const ret = menu.add(req.body);
    if (!ret) {
        res.send('Food already exists');
        return;
    }
    menu.serialize();
    res.send('OK');
});
app.post('/food/remove', (req, res) => {
    const ret = menu.remove(req.body);
    if (!ret) {
        res.send('Food doesn\'t exitst');
        return;
    }
    menu.serialize();
    res.send('OK');
});
app.get('/content/feed', (req, res) => res.send(JSON.stringify(feed.data)));
app.post('/content/feed/set', (req, res) => {
    try {
        feed.data = req.body;
        feed.serialize();
        res.send("OK");
    }
    catch (_a) {
        res.send('Feed not set');
    }
});
app.get('/order/get', (req, res) => {
    if (req.query.id === undefined && req.query.ids == undefined)
        res.send(JSON.stringify(orders.data));
    else if (req.query.ids === undefined)
        res.send(JSON.stringify(orders.data.filter(e => e.order_id == req.query.id)));
    else
        res.send(JSON.stringify(orders.data.filter(e => { var _a; return (_a = req.query.ids) === null || _a === void 0 ? void 0 : _a.toString().includes(e.order_id); })));
});
app.post('/order/add', (req, res) => {
    if ([req.body.name, req.body.phone, req.body.adress, req.body.content].includes(undefined) ||
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.exec(req.body.phone) === null) {
        res.send("Invalid parameters");
        return;
    }
    if (req.body.phone[0] != '+')
        req.body.phone = '+7' + req.body.phone.substring(1);
    const order = new order_1.Order(req.body.name, req.body.phone, req.body.adress, 'CREATED', req.body.content);
    while (orders.ids().includes(order.order_id))
        order.assign_id();
    const ret = orders.add(order);
    if (!ret) {
        res.send('Order already exists');
        return;
    }
    orders.serialize();
    res.send(order.order_id);
});
app.post('/order/state/update', (req, res) => {
    let id = req.body.order_id;
    if (id === undefined)
        id = req.query.id;
    const new_state = req.body.new_state;
    if ([id, new_state].includes(undefined)) {
        res.send("Invalid parameters (order_id: number and new_state: string fields must be specified)");
        return;
    }
    const order = orders.data.find(e => e.order_id == id);
    if (new_state == (order === null || order === void 0 ? void 0 : order.state)) {
        res.send("State not affected");
        return;
    }
    if (order === undefined) {
        res.send("No order with such id");
        return;
    }
    order.state = new_state;
    orders.serialize();
    res.send('OK');
    if (req.body.message !== undefined)
        io.emit('ORDER STATE CHANGED', [order.order_id, order.state, req.body.message]);
    else
        io.emit('ORDER STATE CHANGED', [order.order_id, order.state]);
});
app.post('/images/load', (req, res) => {
    const url = req.body.url;
    const name = req.body.name;
    if (url === undefined || name === undefined) {
        res.send("Needed params: url and name");
        return;
    }
    const file = fs_1.default.createWriteStream('img/' + name);
    const request = https_1.default.get(url, function (response) {
        if (response.statusCode != 200) {
            res.send("Error loading file: broken link");
            return;
        }
        response.pipe(file).on('error', (err) => console.log(err));
        file.on("finish", () => {
            file.close();
            res.send("OK");
        });
    });
});
app.get('/story', (req, res) => {
    res.send('Обнова от 12');
});
server.listen(port, () => {
    console.log(`⚡ Сервер запущен на порте ${port}`);
});
// @app.route('/food/get', methods=['GET'])
// @app.route('/food/add', methods=['POST'])
// @app.route('/food/remove', methods=['POST'])
// @app.route('/content/feed', methods=["GET"])
// @app.route('/content/feed/set', methods=["POST"])
// @app.route('/order/get', methods=["GET"])
// @app.route('/order/add', methods=["POST"])

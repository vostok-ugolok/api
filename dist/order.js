"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const crypto_1 = require("crypto");
class Order {
    constructor(name, phone, adress, state) {
        this.name = name;
        this.phone = phone;
        this.adress = adress;
        this.state = state;
        const now = new Date();
        this.creation_time = `${now.toLocaleDateString()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        this.order_id = ((0, crypto_1.randomInt)(899999) + 100000).toString();
        this.unique_id = this.phone;
    }
    assign_id() {
        this.order_id = ((0, crypto_1.randomInt)(899999) + 100000).toString();
        this.unique_id = this.order_id;
    }
}
exports.Order = Order;

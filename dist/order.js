"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(name, phone, adress, state) {
        this.name = name;
        this.phone = phone;
        this.adress = adress;
        this.state = state;
        const now = new Date();
        this.creation_time = `${now.toLocaleDateString()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        this.order_id = (Math.floor(Math.random() * 899999) + 100000).toString();
        this.unique_id = this.phone;
    }
    assign_id() {
        this.order_id = (Math.floor(Math.random() * 899999) + 100000).toString();
        this.unique_id = this.order_id;
    }
}
exports.Order = Order;

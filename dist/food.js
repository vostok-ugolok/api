"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedFood = exports.MenuFood = exports.Food = void 0;
const crypto_1 = require("crypto");
class Food {
    constructor(name, identifier, price, image, description, mass, avaiable) {
        this.name = name;
        this.identifier = identifier;
        this.price = price;
        this.image = image;
        this.description = description;
        this.mass = mass;
        this.avaiable = avaiable;
        this.unique_id = ((0, crypto_1.randomInt)(899999) + 100000).toString();
    }
}
exports.Food = Food;
class MenuFood extends Food {
}
exports.MenuFood = MenuFood;
class FeedFood extends Food {
    constructor(name, identifier, price, image, description, mass) {
        super(name, identifier, price, image, description, mass, true);
    }
}
exports.FeedFood = FeedFood;

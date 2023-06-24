"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedFood = exports.MenuFood = exports.Food = void 0;
class Food {
    constructor(name, identifier, price, image, description, mass, avaiable) {
        this.name = name;
        this.identifier = identifier;
        this.price = price;
        this.image = image;
        this.description = description;
        this.mass = mass;
        this.avaiable = avaiable;
        this.unique_id = identifier;
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

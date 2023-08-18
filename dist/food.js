"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
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

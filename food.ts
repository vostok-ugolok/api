import { randomInt } from "crypto";

export class Food{
    unique_id : string;

    constructor(public name: string,
        public dish_type: string,
        public price: number,
        public image: string,
        public description: string,
        public mass: number,
        public avaiable: boolean
    ) {
            this.unique_id = (randomInt(899999) + 100000).toString()
        }
}

export class MenuFood extends Food{}

export class FeedFood extends Food{
    constructor(name: string, dish_type: string, price: number,
    image: string, description: string, mass: number) {
        super(name, dish_type, price, image, description, mass, true);
    }
}


import { randomInt } from "crypto";

export class Food{
    unique_id : string;

    constructor(public name: string,
        public identifier: string,
        public price: number,
        public image: string,
        public description: string,
        public mass: number,
        public avaiable: boolean
    ) {
            this.unique_id = identifier
        }
}

export class MenuFood extends Food{}

export class FeedFood extends Food{
    constructor(name: string, identifier: string, price: number,
    image: string, description: string, mass: number) {
        super(name, identifier, price, image, description, mass, true);
    }
}


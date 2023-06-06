import { randomInt } from "crypto";

export class Order {
    order_id: string;
    name: string;
    phone: string;
    adress: string;
    state: string;
    creation_time: string;

    unique_id : string;
    constructor(name: string, phone: string, adress: string, state: string){
        this.name = name;
        this.phone = phone;
        this.adress = adress;
        this.state = state;
        const now = new Date();
        this.creation_time = `${now.toLocaleDateString()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

        this.order_id = (randomInt(899999) + 100000).toString()
        this.unique_id = this.phone;
    }

    assign_id(){
        this.order_id = (randomInt(899999) + 100000).toString()
        this.unique_id = this.order_id;
    }
}
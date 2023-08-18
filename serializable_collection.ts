import { Food } from "./food";
import * as fs from 'fs';
import { Order } from "./order";

export default class SerializeableCollection<T>{
    data: T[];
    path: string;

    constructor(path: string){
        this.path = path;
        this.data = JSON.parse(fs.readFileSync(this.path!, 'utf-8')) as T[]
    }

    add(element: T): boolean{
        if (!this.data.includes(element)){
            this.data!.push(element);
            return true;
        }
        return false;
    }

    remove(element: T): boolean{
        if (this.data.includes(element)){
            this.data = this.data!.filter(f => f != element);
            return true;
        }
        return false;
    }

    serialize(){
        fs.writeFileSync(this.path!, JSON.stringify(this.data, null, 2));
    }
}
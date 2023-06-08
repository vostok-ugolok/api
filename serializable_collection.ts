import { FeedFood, Food } from "./food";
import * as fs from 'fs';
import { Order } from "./order";

export default class SerializeableCollection<T extends Food | Order>{
    data: T[];
    path: string;

    constructor(path: string){
        this.path = path;
        this.data = JSON.parse(fs.readFileSync(this.path!, 'utf-8')) as T[]
    }

    ids(){
        const names = []
        for (const f of this.data){
            names.push(f.unique_id);
        }
        return names;
    }

    add(element: T): boolean{
        if (!this.ids().includes(element.unique_id)){
            this.data!.push(element);
            return true;
        }
        return false;
    }

    remove(element: T): boolean{
        if (element.unique_id in this.ids()){
            this.data = this.data!.filter(f => f != element);
            return true;
        }
        return false;
    }

    serialize(){
        fs.writeFileSync(this.path!, JSON.stringify(this.data, null, 2));
    }
}
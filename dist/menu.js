"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class Menu {
    constructor() {
        this.path = './data/menu.json';
        this.data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        console.log();
    }
    names() {
        const names = [];
        for (const f of this.data)
            names.push(f.name);
        return names;
    }
    add(food) {
        if (!(food.name in this.names())) {
            this.data.push(food);
            return true;
        }
        return false;
    }
    remove(food) {
        if (food.name in this.names()) {
            this.data = this.data.filter(f => f != food);
            return true;
        }
        return false;
    }
    serialize() {
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
    }
}
exports.default = Menu;

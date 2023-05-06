import { Tool } from "./Tool";

export class CartItem{
    constructor(tool: Tool){
        this.tool = tool;
    }
    id: number = 1;
    tool: Tool;
    quantity: number = 1;
    
    get price():number{
        return this.tool.price * this.quantity;
    }

}
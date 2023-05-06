import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Tool } from 'src/app/shared/models/Tool';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();
  constructor() { }

  addToCart(tool: Tool): void{
    let cartItem = this.cart.items.find(item => item.tool.id === tool.id);
    if(cartItem){
      this.changeQuantity(tool.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(tool));
  }

  removeFromCart(toolId: number): void{
    this.cart.items = 
    this.cart.items.filter(item => item.tool.id != toolId);
  }

  changeQuantity(toolId:number, quantity: number){
    let cartItem = this.cart.items.find(item => item.tool.id === toolId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
  }

  getCart():Cart{
    return this.cart;
  }
}

import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cart!:Cart;
  constructor(private cartService: CartService){
    this.setCart();
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.tool.id);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.tool.id, quantity);
    this.setCart();
    console.log(`Changing quantity of tool ${cartItem.tool.id} to ${quantity}`);

  }

  setCart(){
    this.cart = this.cartService.getCart();
    console.log(this.cart); // log the cart object to the console
    console.log(this.cart.items);  }
}

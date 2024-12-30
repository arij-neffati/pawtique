import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  getCartItems() {
    return this.cartItems.value;
  }

  addToCart(product: any) {
    const items = [...this.cartItems.value];
    const existingItem = items.find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    this.cartItems.next(items);
  }

  removeFromCart(productId: string) {
    const items = this.cartItems.value.filter((item) => item._id !== productId);
    this.cartItems.next(items);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}

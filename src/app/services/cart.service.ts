import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.loadCartFromLocalStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  private loadCartFromLocalStorage(): any[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCartToLocalStorage(items: any[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  getCartItems() {
    return this.cartItems.getValue();
  }

  addToCart(product: any): void {
    const items = [...this.cartItems.getValue()];
    const existingItem = items.find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    this.cartItems.next(items);
    this.saveCartToLocalStorage(items);
  }

  removeFromCart(productId: string): void {
    const items = this.cartItems.getValue().filter((item) => item._id !== productId);
    this.cartItems.next(items);
    this.saveCartToLocalStorage(items);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }
}

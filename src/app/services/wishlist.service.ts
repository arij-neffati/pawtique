import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems = new BehaviorSubject<any[]>([]);
  wishlistItems$ = this.wishlistItems.asObservable();

  constructor(private cartService: CartService) {}

  getWishlistItems() {
    return this.wishlistItems.value;
  }

  addToWishlist(product: any) {
    const items = [...this.wishlistItems.value];
    const existingItem = items.find((item) => item._id === product._id);
    if (!existingItem) {
      items.push(product);
    }
    this.wishlistItems.next(items);
  }

  removeFromWishlist(productId: string) {
    const items = this.wishlistItems.value.filter((item) => item._id !== productId);
    this.wishlistItems.next(items);
  }

  moveToCart(product: any) {
    this.removeFromWishlist(product._id); // Remove from wishlist
    this.cartService.addToCart(product); // Add to cart
  }
}

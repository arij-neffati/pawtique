import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngFor
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,  // Make it a standalone component
  imports: [CommonModule],  // Include CommonModule for common Angular features
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    if (this.cartItems.length > 0) {
      console.log('Proceeding to checkout with items:', this.cartItems);
      alert('Proceeding to checkout!');
      this.cartService.clearCart(); // Clear cart after checkout
    } else {
      alert('Your cart is empty!');
    }
  }
}

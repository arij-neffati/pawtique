import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular features
import { Router } from '@angular/router'; // Import Router for navigation
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true, // Make it a standalone component
  imports: [CommonModule], // Include CommonModule for ngFor and other features
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Stores the list of cart items
  totalPrice: number = 0; // Tracks the total price of items in the cart

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the cartItems$ observable to get the current cart items
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice(); // Update the total price whenever items change
    });
  }

  // Calculate the total price of items in the cart
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  // Remove an item from the cart based on product ID
  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  // Navigate to the checkout form
  checkout(): void {
    if (this.cartItems.length > 0) {
      // Pass cart data via router state
      this.router.navigate(['/checkout'], { state: { cartItems: this.cartItems } });
    } else {
      alert('Your cart is empty!');
    }
  }
}

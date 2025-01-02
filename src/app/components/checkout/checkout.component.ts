import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  shippingAddress = {
    address: '',
    city: '',
    postalCode: '',
    country: ''
  };
  userId: string = '';  // Store the user ID input by the user
  email: string = '';   // Store the email input by the user
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  handleOrderSubmit(): void {
    if (this.isSubmitting) return;

    if (!this.userId || !this.email) {
      this.errorMessage = 'Please provide your user ID and email to place an order.';
      return;
    }

    this.isSubmitting = true;

    const orderData = {
      userId: this.userId,  // Get the user ID from the input field
      email: this.email,    // Get the email from the input field
      orderItems: this.cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        productId: item._id,  // Assuming this is the product ID
      })),
      shippingAddress: this.shippingAddress,
      price: this.totalPrice,
      shippingPrice: 10,  // Example shipping cost
    };

    console.log('Order Data:', orderData);  // Log the orderData to confirm the user data is included

    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        this.cartService.clearCart();
        alert('Thank you for your order! We will process it soon.');
        this.router.navigate(['/order-confirmation']);
      },
      error: (error) => {
        console.error('Error during order submission:', error);
        this.errorMessage = error.error?.error || 'Order submission failed. Please try again.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}

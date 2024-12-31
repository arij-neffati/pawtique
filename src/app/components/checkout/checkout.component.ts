import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service'; // Order service to interact with the backend

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  shippingAddress = {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  };

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    // Load cart items
    this.cartItems = this.cartService.getCartItems();
    // Calculate total price
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  placeOrder(): void {
    const uniqueString = 'USER_VERIFICATION_STRING'; // Replace with actual user uniqueString logic (e.g., from localStorage or session)

    const order = {
      orderItems: this.cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        image: item.imageUrl,
        product: item._id, // Assuming this is the product ID
      })),
      shippingAddress: this.shippingAddress,
      shippingPrice: 0, // You can adjust this based on your shipping logic
      price: this.totalPrice,
    };

    // Call the OrderService to place the order
    this.orderService.createOrder(order, uniqueString).subscribe(
      (response) => {
        console.log('Order created successfully:', response);
        // Redirect to confirmation or order list page
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}

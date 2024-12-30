import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';  // For *ngFor and other directives
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-food',
  standalone: true,  // Standalone component
  imports: [CommonModule],  // Includes common Angular features
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class FoodComponent implements OnInit {
  products: any[] = [];  // Store all products
  filteredProducts: any[] = [];  // Store filtered products

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();  // Load products when the component is initialized
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Received products:', data);  // Debug log to check received data
        if (data && data.length > 0) {
          this.products = data.map((product: any) => {
            // Prepend the correct base path for images
            product.imageUrl = `assets/images/${product.image}`;
            return product;
          });
          this.filteredProducts = this.products;  // Initialize filteredProducts with all products
        } else {
          console.log('No products available.');
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Filter products based on type
  filterProducts(type: string): void {
    if (type) {
      // Filter products by type
      this.filteredProducts = this.products.filter(product => product.type === type);
    } else {
      // Show all products if no filter
      this.filteredProducts = this.products;
    }
  }

  // Add product to cart
  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}

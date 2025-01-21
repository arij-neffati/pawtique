import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Include FormsModule here
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FoodComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = ''; // Define the searchQuery property

  constructor(private productService: ProductService, private cartService: CartService, private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log('Received products:', data);
        if (data && data.length > 0) {
          this.products = data.map((product: any) => {
            product.imageUrl = `assets/images/${product.image}`;
            return product;
          });
          this.filteredProducts = this.products;
        } else {
          console.log('No products available.');
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  searchProducts(): void {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) // Filter by product name
      );
    } else {
      this.filteredProducts = this.products; // Show all products if search query is empty
    }
  }

  filterProducts(type: string): void {
    if (type) {
      this.filteredProducts = this.products.filter(product => product.type === type);
    } else {
      this.filteredProducts = this.products;
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  addToWishlist(product: any): void {
    this.wishlistService.addToWishlist(product);
  }
}

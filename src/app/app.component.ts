import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import CommonModule

// Components
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { BannerComponent } from './components/banner/banner.component';
import { BestsellingComponent } from './components/bestselling/bestselling.component';
import { BlogComponent } from './components/blog/blog.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { DiscountComponent } from './components/discount/discount.component';
import { FoodComponent } from './components/food/food.component';
import { FooterComponent } from './components/footer/footer.component';
import { InstaComponent } from './components/insta/insta.component';
import { RegisterComponent } from './components/register/register.component';
import { ServiceComponent } from './components/service/service.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsComponent } from './components/us/us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  // For routing features
    RouterLinkActive,  // For router link active state
    RouterLink,  // For router link directive
    HeaderComponent, 
    NavComponent, 
    BannerComponent, 
    BestsellingComponent, 
    BlogComponent, 
    CategoriesComponent,
    ClothesComponent,
    DiscountComponent,
    FooterComponent,
    InstaComponent,
    RegisterComponent,
    ServiceComponent,
    TestimonialComponent,
    WishlistComponent,
    SigninComponent,
    SignupComponent,
    UsComponent,
    HttpClientModule,  // For making HTTP requests
    CommonModule  // For using directives like ngFor
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'pawtique';
  currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => { 
        this.currentUrl = event.urlAfterRedirects;
        console.log('Updated URL:', this.currentUrl);
      });

    this.currentUrl = this.router.url;
    console.log('Initial URL:', this.currentUrl);
  }

  shouldShowLayout(): boolean {
    const noLayoutRoutes = ['/signin', '/signup'];
    const cleanUrl = this.currentUrl.split('?')[0].split('#')[0];
    console.log('Checking Layout Visibility for URL:', cleanUrl);
    return !noLayoutRoutes.includes(cleanUrl);
  }
}

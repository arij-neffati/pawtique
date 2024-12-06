import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { BannerComponent } from './components/banner/banner.component';
import { BestsellingComponent } from './components/bestselling/bestselling.component';
import { BlogComponent } from './components/blog/blog.component';
import { CartComponent } from './components/cart/cart.component';
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
  imports: [RouterOutlet,RouterLinkActive,RouterLink , HeaderComponent, NavComponent , BannerComponent ,BestsellingComponent,BlogComponent,CartComponent,CategoriesComponent,
    ClothesComponent,DiscountComponent,FoodComponent,FooterComponent,InstaComponent,RegisterComponent,ServiceComponent,TestimonialComponent,WishlistComponent
  , SigninComponent, SignupComponent,UsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppComponent {
  title = 'pawtique';
}
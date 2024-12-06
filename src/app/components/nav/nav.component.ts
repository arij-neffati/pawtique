import { Component ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from '../banner/banner.component';
import { BestsellingComponent } from '../bestselling/bestselling.component';
import { BlogComponent } from '../blog/blog.component';
import { CartComponent } from '../cart/cart.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ClothesComponent } from '../clothes/clothes.component';
import { DiscountComponent } from '../discount/discount.component';
import { FoodComponent } from '../food/food.component';
import { FooterComponent } from '../footer/footer.component';
import { InstaComponent } from '../insta/insta.component';
import { RegisterComponent } from '../register/register.component';
import { ServiceComponent } from '../service/service.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { UsComponent} from '../us/us.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive,RouterLink , HeaderComponent, NavComponent , BannerComponent ,BestsellingComponent,BlogComponent,CartComponent,CategoriesComponent,
    ClothesComponent,DiscountComponent,FoodComponent,FooterComponent,InstaComponent,RegisterComponent,ServiceComponent,TestimonialComponent,WishlistComponent
  , SigninComponent, SignupComponent,UsComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NavComponent {

}

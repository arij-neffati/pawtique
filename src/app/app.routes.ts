import { Routes } from '@angular/router';
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
import { UsComponent} from './components/us/us.component';


export const routes: Routes = [ { path: 'nav', component: NavComponent },
    { title:'pawsitive|Best Selling', path: 'bestselling', component: BestsellingComponent },
    { title:'pawsitive|Blog',path: 'blog', component: BlogComponent },
    { title:'pawsitive|Cart',path: 'cart', component: CartComponent },
    { title:'pawsitive|Categoris',path: 'categories', component: CategoriesComponent },
    { title:'pawsitive|Clothes',path: 'clothes', component: ClothesComponent },
    { title:'pawsitive|Discount',path: 'discount', component: DiscountComponent },
    { title:'pawsitive|Food',path: 'food', component: FoodComponent },
    { title:'pawsitive|footer',path: 'footer', component: FooterComponent },
    { title:'pawsitive|insta',path: 'insta', component: InstaComponent },
    { title:'pawsitive|Register', path: 'register', component: RegisterComponent },
    { title:'pawsitive|Services',path: 'service', component: ServiceComponent },
    { title:'pawsitive|Testimonial',path: 'testimonial', component: TestimonialComponent },
    { title:'pawsitive|Wishlist',path: 'wishlist', component: WishlistComponent },
    { title:'pawsitive|SignIn',path: 'signin', component: SigninComponent },
    { title:'pawsitive|SignUp',path: 'signup', component: SignupComponent },
    {title:'pawsitive|AboutUs',path: 'us', component: UsComponent },
    { title:'pawsitive|404',path: '**', redirectTo: '' },
    { path: 'signin', component: SigninComponent },
   { path: 'signup', component: SignupComponent },
   { path: '**', redirectTo: '' },  // Redirection par défaut en cas de route non trouvée
   { path: '', component: BannerComponent } // Page d'accueil
    ];

import { Component } from '@angular/core';
import { InstaComponent } from '../insta/insta.component';
import { BlogComponent}from '../blog/blog.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';

@Component({
  selector: 'app-us',
  standalone: true,
  imports: [InstaComponent,BlogComponent,TestimonialComponent],
  templateUrl: './us.component.html',
  styleUrl: './us.component.css'
})
export class UsComponent {

}

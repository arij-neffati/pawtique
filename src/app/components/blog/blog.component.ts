import { Component , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class BlogComponent {

}

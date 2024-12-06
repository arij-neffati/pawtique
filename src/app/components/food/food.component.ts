import { Component , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css' ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class FoodComponent {}


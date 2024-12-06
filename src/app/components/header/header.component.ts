import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Fixed typo here
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ensure this is correctly set
})
export class HeaderComponent { }

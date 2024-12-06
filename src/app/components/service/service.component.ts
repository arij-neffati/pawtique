import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-service',
  standalone: true,
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiceComponent { }
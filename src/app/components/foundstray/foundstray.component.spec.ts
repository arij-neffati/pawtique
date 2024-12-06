import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundstrayComponent } from './foundstray.component';

describe('FoundstrayComponent', () => {
  let component: FoundstrayComponent;
  let fixture: ComponentFixture<FoundstrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundstrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoundstrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepCheckAvailabilityComponent } from './recep-check-availability.component';

describe('RecepCheckAvailabilityComponent', () => {
  let component: RecepCheckAvailabilityComponent;
  let fixture: ComponentFixture<RecepCheckAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecepCheckAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepCheckAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

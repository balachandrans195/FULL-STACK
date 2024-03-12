import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepBookAppointmentComponent } from './recep-book-appointment.component';

describe('RecepBookAppointmentComponent', () => {
  let component: RecepBookAppointmentComponent;
  let fixture: ComponentFixture<RecepBookAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecepBookAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

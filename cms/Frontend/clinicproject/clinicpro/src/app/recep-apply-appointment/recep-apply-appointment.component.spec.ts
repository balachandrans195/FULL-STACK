import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepApplyAppointmentComponent } from './recep-apply-appointment.component';

describe('RecepApplyAppointmentComponent', () => {
  let component: RecepApplyAppointmentComponent;
  let fixture: ComponentFixture<RecepApplyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecepApplyAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepApplyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

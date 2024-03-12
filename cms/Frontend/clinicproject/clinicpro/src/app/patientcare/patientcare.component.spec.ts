import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientcareComponent } from './patientcare.component';

describe('PatientcareComponent', () => {
  let component: PatientcareComponent;
  let fixture: ComponentFixture<PatientcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientcareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientgivemedComponent } from './patientgivemed.component';

describe('PatientgivemedComponent', () => {
  let component: PatientgivemedComponent;
  let fixture: ComponentFixture<PatientgivemedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientgivemedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientgivemedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

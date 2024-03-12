import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepAddPatientComponent } from './recep-add-patient.component';

describe('RecepAddPatientComponent', () => {
  let component: RecepAddPatientComponent;
  let fixture: ComponentFixture<RecepAddPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecepAddPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepAddPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

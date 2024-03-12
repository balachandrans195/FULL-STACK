import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabcareComponent } from './labcare.component';

describe('LabcareComponent', () => {
  let component: LabcareComponent;
  let fixture: ComponentFixture<LabcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabcareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

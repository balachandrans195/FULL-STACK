import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtechnicianComponent } from './labtechnician.component';

describe('LabtechnicianComponent', () => {
  let component: LabtechnicianComponent;
  let fixture: ComponentFixture<LabtechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabtechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabtechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

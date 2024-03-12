import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { AddstaffComponent } from './addstaff.component';
import { AddStaffComponent } from './addstaff.component';
describe('AddstaffComponent', () => {
  let component: AddStaffComponent;
  let fixture: ComponentFixture<AddStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

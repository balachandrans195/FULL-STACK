import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabgivemedComponent } from './labgivemed.component';

describe('LabgivemedComponent', () => {
  let component: LabgivemedComponent;
  let fixture: ComponentFixture<LabgivemedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabgivemedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabgivemedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

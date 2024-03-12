import { TestBed } from '@angular/core/testing';

import { RecepBookAppointmentService } from './recep-book-appointment.service';

describe('RecepBookAppointmentService', () => {
  let service: RecepBookAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepBookAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

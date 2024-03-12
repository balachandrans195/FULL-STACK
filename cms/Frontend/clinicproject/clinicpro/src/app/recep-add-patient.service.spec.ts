import { TestBed } from '@angular/core/testing';

// import { RecepAddPatientService } from './recep-add-patient.service';
import { ReceptionistService } from './recep-add-patient.service';

describe('RecepAddPatientService', () => {
  let service: ReceptionistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptionistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

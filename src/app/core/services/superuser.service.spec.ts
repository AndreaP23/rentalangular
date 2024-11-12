import { TestBed } from '@angular/core/testing';

import { SuperUserService } from './superuser.service';

describe('SuperuserService', () => {
  let service: SuperUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

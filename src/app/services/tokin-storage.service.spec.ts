import { TestBed } from '@angular/core/testing';

import { TokinStorageService } from './tokin-storage.service';

describe('TokinStorageService', () => {
  let service: TokinStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokinStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

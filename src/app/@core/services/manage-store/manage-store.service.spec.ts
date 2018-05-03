import { TestBed, inject } from '@angular/core/testing';

import { ManageStoreService } from './manage-store.service';

describe('ManageStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageStoreService]
    });
  });

  it('should be created', inject([ManageStoreService], (service: ManageStoreService) => {
    expect(service).toBeTruthy();
  }));
});

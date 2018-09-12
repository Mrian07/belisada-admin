import { TestBed, inject } from '@angular/core/testing';

import { ManageBuyerService } from './manage-buyer.service';

describe('ManageBuyerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageBuyerService]
    });
  });

  it('should be created', inject([ManageBuyerService], (service: ManageBuyerService) => {
    expect(service).toBeTruthy();
  }));
});

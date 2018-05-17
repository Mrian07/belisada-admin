import { TestBed, inject } from '@angular/core/testing';

import { ManageProductService } from './manage-product.service';

describe('ManageProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageProductService]
    });
  });

  it('should be created', inject([ManageProductService], (service: ManageProductService) => {
    expect(service).toBeTruthy();
  }));
});

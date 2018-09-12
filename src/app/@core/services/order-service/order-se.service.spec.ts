import { TestBed, inject } from '@angular/core/testing';

import { OrderSeService } from './order-se.service';

describe('OrderSeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderSeService]
    });
  });

  it('should be created', inject([OrderSeService], (service: OrderSeService) => {
    expect(service).toBeTruthy();
  }));
});

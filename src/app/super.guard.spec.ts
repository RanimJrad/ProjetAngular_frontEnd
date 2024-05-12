import { TestBed } from '@angular/core/testing';

import { superGuard } from './super.guard';

describe('ProduitGuard', () => {
  let guard: superGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(superGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

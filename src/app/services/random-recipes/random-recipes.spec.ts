import { TestBed } from '@angular/core/testing';

import { RandomRecipes } from './random-recipes';

describe('RandomRecipes', () => {
  let service: RandomRecipes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomRecipes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

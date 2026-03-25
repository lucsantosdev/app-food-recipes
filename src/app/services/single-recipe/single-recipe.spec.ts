import { TestBed } from '@angular/core/testing';

import { SingleRecipe } from './single-recipe';

describe('SingleRecipe', () => {
  let service: SingleRecipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleRecipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarRecipes } from './similar-recipes';

describe('SimilarRecipes', () => {
  let component: SimilarRecipes;
  let fixture: ComponentFixture<SimilarRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(SimilarRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

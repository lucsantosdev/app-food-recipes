import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRecipe } from './single-recipe';

describe('SingleRecipe', () => {
  let component: SingleRecipe;
  let fixture: ComponentFixture<SingleRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

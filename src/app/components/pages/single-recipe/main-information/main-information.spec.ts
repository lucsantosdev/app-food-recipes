import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInformation } from './main-information';

describe('MainInformation', () => {
  let component: MainInformation;
  let fixture: ComponentFixture<MainInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainInformation],
    }).compileComponents();

    fixture = TestBed.createComponent(MainInformation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

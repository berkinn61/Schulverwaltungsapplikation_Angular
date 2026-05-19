import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchuelerAdd } from './schueler-add';

describe('SchuelerAdd', () => {
  let component: SchuelerAdd;
  let fixture: ComponentFixture<SchuelerAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchuelerAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SchuelerAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

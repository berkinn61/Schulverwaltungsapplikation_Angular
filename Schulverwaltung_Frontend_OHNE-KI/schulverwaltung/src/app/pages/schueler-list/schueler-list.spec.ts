import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchuelerList } from './schueler-list';

describe('SchuelerList', () => {
  let component: SchuelerList;
  let fixture: ComponentFixture<SchuelerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchuelerList],
    }).compileComponents();

    fixture = TestBed.createComponent(SchuelerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassenraumAdd } from './klassenraum-add';

describe('KlassenraumAdd', () => {
  let component: KlassenraumAdd;
  let fixture: ComponentFixture<KlassenraumAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlassenraumAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(KlassenraumAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

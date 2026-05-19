import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassenraumList } from './klassenraum-list';

describe('KlassenraumList', () => {
  let component: KlassenraumList;
  let fixture: ComponentFixture<KlassenraumList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlassenraumList],
    }).compileComponents();

    fixture = TestBed.createComponent(KlassenraumList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

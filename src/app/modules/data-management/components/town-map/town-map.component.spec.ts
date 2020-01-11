import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownMapComponent } from './town-map.component';

describe('TownMapComponent', () => {
  let component: TownMapComponent;
  let fixture: ComponentFixture<TownMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

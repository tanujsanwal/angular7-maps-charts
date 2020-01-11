import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownDetailsComponent } from './town-details.component';

describe('TownDetailsComponent', () => {
  let component: TownDetailsComponent;
  let fixture: ComponentFixture<TownDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

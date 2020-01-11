import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HideUnhideTownComponent } from './hide-unhide-town.component';

describe('HideUnhideTownComponent', () => {
  let component: HideUnhideTownComponent;
  let fixture: ComponentFixture<HideUnhideTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HideUnhideTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HideUnhideTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

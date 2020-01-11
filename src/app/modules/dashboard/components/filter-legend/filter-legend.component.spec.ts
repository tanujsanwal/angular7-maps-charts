import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLegendComponent } from './filter-legend.component';

describe('FilterLegendComponent', () => {
  let component: FilterLegendComponent;
  let fixture: ComponentFixture<FilterLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftFilterComponent } from './left-filter.component';

describe('LeftFilterComponent', () => {
  let component: LeftFilterComponent;
  let fixture: ComponentFixture<LeftFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TownsListComponent } from './towns-list.component';

describe('TownsListComponent', () => {
  let component: TownsListComponent;
  let fixture: ComponentFixture<TownsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

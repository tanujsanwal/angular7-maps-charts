import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDetailsSidebarComponent } from './marker-details-sidebar.component';

describe('MarkerDetailsSidebarComponent', () => {
  let component: MarkerDetailsSidebarComponent;
  let fixture: ComponentFixture<MarkerDetailsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerDetailsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerDetailsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

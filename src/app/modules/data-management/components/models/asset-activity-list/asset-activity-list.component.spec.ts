import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetActivityListComponent } from './asset-activity-list.component';

describe('AssetActivityListComponent', () => {
  let component: AssetActivityListComponent;
  let fixture: ComponentFixture<AssetActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

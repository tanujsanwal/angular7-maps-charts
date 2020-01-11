import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeneralDetailComponent } from './add-general-detail.component';

describe('AddGeneralDetailComponent', () => {
  let component: AddGeneralDetailComponent;
  let fixture: ComponentFixture<AddGeneralDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGeneralDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGeneralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

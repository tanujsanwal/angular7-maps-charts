import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTownComponent } from './delete-town.component';

describe('DeleteTownComponent', () => {
  let component: DeleteTownComponent;
  let fixture: ComponentFixture<DeleteTownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

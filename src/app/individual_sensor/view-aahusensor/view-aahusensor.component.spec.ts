import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAahusensorComponent } from './view-aahusensor.component';

describe('ViewAahusensorComponent', () => {
  let component: ViewAahusensorComponent;
  let fixture: ComponentFixture<ViewAahusensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAahusensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAahusensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

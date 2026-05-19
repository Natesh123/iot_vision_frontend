import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsensorComponent } from './viewsensor.component';

describe('ViewsensorComponent', () => {
  let component: ViewsensorComponent;
  let fixture: ComponentFixture<ViewsensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

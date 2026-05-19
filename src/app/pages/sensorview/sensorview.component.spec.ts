import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorviewComponent } from './sensorview.component';

describe('SensorviewComponent', () => {
  let component: SensorviewComponent;
  let fixture: ComponentFixture<SensorviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

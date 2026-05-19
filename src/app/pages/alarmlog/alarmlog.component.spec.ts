import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmlogComponent } from './alarmlog.component';

describe('AlarmlogComponent', () => {
  let component: AlarmlogComponent;
  let fixture: ComponentFixture<AlarmlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsensorsComponent } from './editsensors.component';

describe('EditsensorsComponent', () => {
  let component: EditsensorsComponent;
  let fixture: ComponentFixture<EditsensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

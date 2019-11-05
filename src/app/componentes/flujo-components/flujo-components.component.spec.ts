import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoComponentsComponent } from './flujo-components.component';

describe('FlujoComponentsComponent', () => {
  let component: FlujoComponentsComponent;
  let fixture: ComponentFixture<FlujoComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlujoComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

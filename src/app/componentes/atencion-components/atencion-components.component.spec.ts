import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionComponentsComponent } from './atencion-components.component';

describe('AtencionComponentsComponent', () => {
  let component: AtencionComponentsComponent;
  let fixture: ComponentFixture<AtencionComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

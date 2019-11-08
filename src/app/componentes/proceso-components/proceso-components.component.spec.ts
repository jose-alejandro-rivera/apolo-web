import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoComponentsComponent } from './proceso-components.component';

describe('ProcesoComponentsComponent', () => {
  let component: ProcesoComponentsComponent;
  let fixture: ComponentFixture<ProcesoComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

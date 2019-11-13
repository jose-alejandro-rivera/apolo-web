import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioComponentsComponent } from './cuestionario-components.component';

describe('CuestionarioComponentsComponent', () => {
  let component: CuestionarioComponentsComponent;
  let fixture: ComponentFixture<CuestionarioComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionarioComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuestionarioComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracionCamaraComponent } from './integracion-camara.component';

describe('IntegracionCamaraComponent', () => {
  let component: IntegracionCamaraComponent;
  let fixture: ComponentFixture<IntegracionCamaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegracionCamaraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegracionCamaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracionHadaComponent } from './integracion-hada.component';

describe('IntegracionHadaComponent', () => {
  let component: IntegracionHadaComponent;
  let fixture: ComponentFixture<IntegracionHadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegracionHadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegracionHadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

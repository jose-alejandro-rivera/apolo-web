import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoComponentsComponent } from './paso-components.component';

describe('PasoComponentsComponent', () => {
  let component: PasoComponentsComponent;
  let fixture: ComponentFixture<PasoComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasoComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

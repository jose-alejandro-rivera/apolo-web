import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponentsComponent } from './home-components.component';

describe('HomeComponentsComponent', () => {
  let component: HomeComponentsComponent;
  let fixture: ComponentFixture<HomeComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

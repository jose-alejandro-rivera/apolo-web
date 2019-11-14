import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home-components.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

describe('HomeComponentsComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   // expect(component.).toBeTruthy();
  // });
});

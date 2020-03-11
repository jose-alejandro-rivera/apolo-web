import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

/**
 * 
 */
@Component({
  selector: 'app-orden-components',
  templateUrl: './orden-components.component.html',
  styleUrls: ['./orden-components.component.css']
})
/**
 * 
 */
export class OrdenComponentsComponent implements OnInit {

    /**
   * variable que itera el componente atencion
   */
  componentFlujo: boolean;
  /**
   * variable que itera el componente de categorias
   */
  componentCategoria: boolean;

  /**
   * 
   */
  orden: any;
  /**
   * 
   */
  public formOrden: FormGroup;
  /**
   * 
   */
  public submitted = false;
  

  /**
   * 
   * @param router 
   * @param formBuilder 
   */
  constructor(private router: Router,
    private formBuilder: FormBuilder) {
      this.componentFlujo = false;
      this.componentCategoria = false;
    localStorage.setItem('dataFlujoOrden', '');
    this.router.events.subscribe((event: Event) => {
    });
    this.formOrden = this.formBuilder.group({
      orden: ['', Validators.required]
    });
  }

  ngOnInit() {



  }

  get f() {
    return this.formOrden.controls;
  }

  ingresoOrden($event) {
    if (this.formOrden.invalid) {
      this.submitted = true;
      return;
    } else {
      this.orden = this.formOrden.value.orden;
      localStorage.setItem('dataFlujoOrden', JSON.stringify(this.orden));

      this.enrutamiento();


      console.log("usted esta aqui app-component");
    }
  }

  enrutamiento() {
    this.router.navigate(['home/componet']);
    return false;

  }

}

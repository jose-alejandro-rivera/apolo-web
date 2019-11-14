import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CategoriasService } from '../../servicios/categorias.service';
import { FlujoService } from '../../servicios/flujo.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

<<<<<<< HEAD
const URL = 'http://localhost:8080/api/';

=======
>>>>>>> 0ad1d724e2c83d672e2f4d03611c854c74632a63
@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponent implements OnInit {
  listCategoria: any[] = []; // variable para el cargue de categorias
  listFlujos: any; // variable para el cargue de todos los flujos
  flujo2: any; //
  categoria: any;
  categorias: any;
  formCategorias: FormGroup;
  homeComponent: Boolean;
  submitted = false;
  arregloCat: any[] = [];
  public crearCategoria = {
    idflujo: null,
    idCategoria: null
  };

  constructor(private http: HttpClient, private categoriasService: CategoriasService, private flujoService: FlujoService, private router: Router, private formBuilder: FormBuilder) {
    this.homeComponent = true;
    localStorage.setItem('dataFlujoCat','');
    this.formCategorias = this.formBuilder.group({
      idCategoria: ['', Validators.required],
      idflujo: ['', Validators.required]
    });
  }

  ngOnInit() {
    /* Esta funcion permite cargar el servicio para alimentar el select  de todas las categorias*/
    this.categoriasService.testBackEnd(URL+'flujo/categorias').subscribe((data) => {
      setTimeout(() => {
        for (let x in data) {
          if (data[x].Id_CategoriaFlujo != undefined) {
            console.log(data[x].Id_CategoriaFlujo);
            this.arregloCat.push({
              Id_CategoriaFlujo: data[x].Id_CategoriaFlujo,
              NomCategoriaFlujo: data[x].NomCategoriaFlujo,
            })
          }
        }

      }, 100)
    });

    console.log(this.arregloCat);
    
  }
  get f() {
    return this.formCategorias.controls;
  }
  /* Esta funcion permite realizar el filtro de los flujos segun la categoria que se haya seleccionada*/
  cargueFlujo(event) {
    let idCatefgoria = event.target.value;
    if (idCatefgoria == null || idCatefgoria == '') {
      this.flujo2 = [];
      return
    }
    this.flujoService.getFlujos(idCatefgoria).subscribe((data) => {
      this.flujo2 = data;
    })
  }
  /* Valida el formulario de la pagina home-components.componentes.html */
  validaCampos() {
   
    if (this.formCategorias.invalid) {
      this.submitted = true;
      return;
    }else{
      this.homeComponent = false;
      setTimeout(()=>{
        localStorage.setItem('dataFlujoCat',JSON.stringify(this.flujo2));
        this.router.navigate(['flujo/list']);
      },500)
    }
 
  }
  /* Este metodo permite conectarse al servicio CategoriasService */
  public creaAtencion(e, state: RouterStateSnapshot) {
    this.categoriasService.crearAtencion(this.crearCategoria).subscribe(data => {
        this.router.navigate(['flujo/list'], { queryParams: { data: 'crearCategoria' }});
        return false;
    })
  }
}
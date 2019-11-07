import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CategoriasService } from '../servicios/categorias.service';
import { FlujoService } from '../servicios/flujo.service';
import { FORMERR } from 'dns';



class body {
/*  ProductName: string;
  ProductDescription: string;
  ProductPrice: number; */
}

class headers {
 /* ProductName: string;
  ProductDescription: string;
  ProductPrice: number; */
}

@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponent implements OnInit {

  listCategoria: any;
  listFlujos: any ;
  flujo: any[]=[];



  constructor(private http: HttpClient, private categoriasService: CategoriasService, private flujoService: FlujoService ) {   }
  

  ngOnInit() {
    console.log('init del home');
    this.categoriasService.getCategorias().subscribe((data: body[]) => {
     this.listCategoria = data;
      //console.log(data);
    });

    this.flujoService.getFlujos().subscribe((data: body[]) => {
      this.listFlujos = data;
      for(let x of this.listFlujos){
        this.flujo.push(x)
      }
      console.log(this.flujo);
   //   console.log('Listado de flujos ' +JSON.parse(JSON.stringify(this.listFlujos)));
    })
    

  }

}

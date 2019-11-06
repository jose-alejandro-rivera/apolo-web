import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CategoriasService } from '../servicios/categorias.service';

class body {
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
}

class headers {
  ProductName: string;
  ProductDescription: string;
  ProductPrice: number;
}

@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponent implements OnInit {
	body : body[];
  headers : headers[];


  categorias: any = [];
  //filas: any = [];



  constructor(private http: HttpClient, private categoriasService: CategoriasService ) {   }
  

  ngOnInit() {
    console.log('init del home');
    this.categoriasService.getCategorias().subscribe((data: body[]) => {
      console.log(data);
    });

  }

}

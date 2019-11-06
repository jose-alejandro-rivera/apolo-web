import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";




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
  private rowSelection;
  private autoGroupColumnDef;
  private domLayout;

  oppoSuits: any = [];
  filas: any = [];

  columnDefs = [
    {
      headerName: "Seleccionar",
      field: "athlete",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
    },
    {headerName: 'Make', field: 'make', sortable: true, filter: true,  resizable: true },
    {headerName: 'Make', field: 'make', sortable: true, filter: true, resizable: true },
    {headerName: 'Model', field: 'model', sortable: true, filter: true, resizable: true },
    {headerName: 'Price', field: 'price', sortable: true, filter: true, resizable: true},
    {headerName: 'Pricexxx', field: 'pricexxx', sortable: true, filter: true, resizable: true},
];

rowData = [
    { checkboxSelection: true, make: 'Toyota', model: 'Celica', price: 35000, pricexxx: 20000 },
    { checkboxSelection: true, make: 'Ford', model: 'Mondeo', price: 32000, pricexxx: 369888 },
    { checkboxSelection: true, make: 'Porsche', model: 'Boxter', price: 72000, pricexxx: 92540000 }

];
  constructor(private fb: FormBuilder) { 
    setTimeout (()=> {
     // this.selectPrueba()
    },500) 

    this.rowSelection = "multiple";
    this.autoGroupColumnDef = {
      headerName: "Athlete",
      field: "athlete",
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: { checkbox: true }
    };
  }
  

  ngOnInit() {

  	/*this.ps
      .getusers()
      .subscribe((data: body[]) => {
        console.log(data);
      	if(data){
            //console.log(data, 'if');
            this.body = data;
            this.headers = data

      	}
       

    });*/

  }

 /* selectPrueba(){
    this.cf
    .getusers()
    .subscribe((data) => {
      this.oppoSuits = data;
      for(let arreglo of this.oppoSuits.body){
          this.filas.push(
            {
              id: arreglo.id,
              nombre: arreglo.nombre, 
              apellido: arreglo.apellido
            }
          )
      }
      console.log(this.filas, 'HGASHDGHASD');
    })
  } */
}

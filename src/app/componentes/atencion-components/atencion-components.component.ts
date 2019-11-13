import { Component, OnInit } from '@angular/core';
import {ICategoria} from '../../interfaces/categoria'

@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css']
})
export class AtencionComponentsComponent implements OnInit {
  dataAtencion: any;
  constructor() { }

  ngOnInit() {
    this.dataAtencion = JSON.parse(localStorage.getItem('dataFlujoCat'));
    console.log(this.dataAtencion)
  }
  
  changeSuit(e) {

  }

}

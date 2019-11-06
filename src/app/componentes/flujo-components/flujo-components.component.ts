import { Component, OnInit } from '@angular/core';
import {ICategoria} from '../../interfaces/categoria'

@Component({
  selector: 'app-flujo-components',
  templateUrl: './flujo-components.component.html',
  styleUrls: ['./flujo-components.component.css']
})
export class FlujoComponentsComponent implements OnInit {
  // private hcate:ICategoria = [];

  constructor() { }

  ngOnInit() {
  }
  
  changeSuit(e) {
    // this.ngOnInit.toString('name').setValue(e.target.value, {
    //    onlySelf: true
    // })
  }

}

import { Component, OnInit } from '@angular/core';
import {ICategoria} from '../../interfaces/categoria'

@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css']
})
export class AtencionComponentsComponent implements OnInit {
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

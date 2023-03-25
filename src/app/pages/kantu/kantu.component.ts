import { Component, OnInit } from '@angular/core';
import { Gushi } from 'src/app/services/bean/gushi.type';

@Component({
  selector: 'app-kantu',
  templateUrl: './kantu.component.html',
  styleUrls: ['./kantu.component.scss']
})
export class KantuComponent implements OnInit {


  shiList: Gushi[] = []

  constructor() { }

  ngOnInit() {
    console.log("come in")
    this.initDefaultGushi()
  }

  initDefaultGushi(){
    console.log("come in")

  }

  getImageList(){
    
  }

}

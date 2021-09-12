import { Component, OnInit } from '@angular/core';
import { HelpList } from './help.constant';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {


  data: any [] = []

  constructor() {
    this.data = HelpList.data
   }

  ngOnInit() {
  }

}

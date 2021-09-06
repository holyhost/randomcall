import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-golden',
  templateUrl: './golden.component.html',
  styleUrls: ['./golden.component.scss']
})
export class GoldenComponent implements OnInit {

  constructor(public data:DataService) { }

  ngOnInit() {
    this.data.initPersonData()
  }

}

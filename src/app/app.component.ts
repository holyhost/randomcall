import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'randomcall';
  headerItems = [
    {name:'随机点名',icon:'#icon-dianmingicon-32',path:'/golden'},
    {name:'设置',icon:'#icon-xitong-copy',path:'/setting'},
    {name:'帮助',icon:'#icon-bangzhu',path:'/help'},
  ]
  
  constructor(public data:DataService){

  }
  
}

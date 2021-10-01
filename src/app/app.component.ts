import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'randomcall';
  isLoading = false;
  headerItems = [
    {name:'menu_random_call',icon:'#icon-dianmingicon-32',path:'/golden'},
    {name:'menu_setting',icon:'#icon-xitong-copy',path:'/setting'},
    {name:'menu_help',icon:'#icon-bangzhu',path:'/help'},
  ]
  
  constructor(public data:DataService,public theme: ThemeService){
    this.data.checkUserStatus().subscribe((res:any)=>{
      if(res && res.status && res.status ==='ok'){
          //验证无问题
      }else{
        this.data.account = "";
        this.data.pwd= '';
      }
      
    },err=>{
      console.log(err)
      this.data.account = "";
      this.data.pwd= '';
    })
  }
  
}

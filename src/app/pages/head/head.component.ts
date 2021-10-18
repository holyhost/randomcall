import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  loginName = "登录"
  status: boolean = false;
  myinfo: any[] = [
    {label:'我的学生',name:'my_students',icon:'#icon-dianmingicon-32',path:'/students'},
    {label:'成绩管理',name:'my_score',icon:'#icon-dianmingicon-32',path:'/score'},
    {label:'我的信息',name:'my_info',icon:'#icon-xitong-copy',path:'/myinfo'},
    {label:'退出登录',name:'my_out',icon:'#icon-bangzhu',path:''},
  ]
  constructor(
    private router: Router,
    public data: DataService,
  ) { 
    if(this.data.account&&this.data.pwd){
      this.loginName = this.data.account;
      this.status = true;
    }
  }

  ngOnInit() {
  }


  onItemClick(path:string=''){
    if(path ==="login" && this.data.account){
      this.router.navigateByUrl("myinfo");
      return;
    }
    this.router.navigateByUrl(path);
  }


  onMyinfoClick(path:string){
    if(path){
      this.router.navigateByUrl(path);
    }else{
      this.logout()
    }
  }

  logout(){
    this.data.isLoading = true;
    this.data.logout().subscribe(res=>{
      if(res && res.status&&res.status =='ok'){
        this.data.account = '';
        this.data.pwd = '';
        this.status = false;
      }
    },error=>{
      // console.log(error)
      this.data.isLoading = false;
    })
  }


}

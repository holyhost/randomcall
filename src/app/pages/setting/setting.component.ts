import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Config } from 'src/app/services/bean/config.constant';
import { DataService } from 'src/app/services/data.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit,OnDestroy {

  randomTime: number = 0

  constructor(
    public theme: ThemeService,
    public data: DataService,
    private message: NzMessageService
  ) { 
    this.randomTime = this.data.randomTime
  }

  ngOnInit() {
  }

  onBgChoose(index: number = 0){
    this.theme.changeTheme(this.theme.themes[index].theme)
  }

  onTimeChange(tim: number){
    if(tim.toString.length>4){
      this.randomTime = Number.parseInt(tim+"")
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //保存修改的随机时间
    if(this.randomTime.toString.length>4){
      this.randomTime = Number.parseInt(this.randomTime+"")
      this.message.create("error","随机时间最多小数点后两位！")
    }else{
      console.log(this.randomTime)
      
    }
    console.log(this.randomTime)
    this.data.randomTime = this.randomTime
    this.data.setItem(Config.RandomTime,this.randomTime+"")
  }

  onLanguageChange(language: string){
    this.data.changeLanguage(language)
  }
}

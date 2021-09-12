import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
    public theme: ThemeService
  ) { 
    console.log(this.theme.curTheme)
  }

  ngOnInit() {
  }

  onBgChoose(index: number = 0){
    this.theme.changeTheme(this.theme.themes[index].theme)
  }
}

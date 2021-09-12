import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NzButtonModule,
    NzListModule
  ]
})
export class SettingModule { }

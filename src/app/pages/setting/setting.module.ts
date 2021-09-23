import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../head/head.module';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NzInputNumberModule,
    TranslateModule,
    FormsModule,
    NzButtonModule,
    NzMessageModule,
    NzInputModule,
    HeadModule,
    NzListModule
  ]
})
export class SettingModule { }

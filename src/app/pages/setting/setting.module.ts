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
import { HeadModule } from '../../widge/head/head.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';

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
    NzRadioModule,
    NzInputModule,
    HeadModule,
    NzListModule
  ]
})
export class SettingModule { }

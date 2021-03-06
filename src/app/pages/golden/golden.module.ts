import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { GoldenComponent } from './golden.component';
import { GoldenRoutingModule } from './golden-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../head/head.module';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [GoldenComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    TranslateModule,
    FormsModule,
    HeadModule,
    NzSelectModule,
    GoldenRoutingModule
  ]
})
export class GoldenModule { }

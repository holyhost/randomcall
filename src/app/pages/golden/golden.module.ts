import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldenComponent } from './golden.component';
import { GoldenRoutingModule } from './golden-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../../widge/head/head.module';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [GoldenComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    HeadModule,
    NzSelectModule,
    GoldenRoutingModule
  ]
})
export class GoldenModule { }

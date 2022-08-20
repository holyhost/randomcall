import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { HeadComponent } from './head.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@NgModule({
  declarations: [HeadComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    TranslateModule,
    FormsModule,
    NzPageHeaderModule
  ],
  exports: [
    HeadComponent
  ]
})
export class HeadModule { }

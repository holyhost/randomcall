import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }

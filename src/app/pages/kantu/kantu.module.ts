import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KantuComponent } from './kantu.component';
import { KantuRoutingModule } from './kantu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from 'src/app/widge/footer/footer.module';
import { HeadModule } from 'src/app/widge/head/head.module';
import { NzImageModule } from 'ng-zorro-antd/image';
@NgModule({
  declarations: [KantuComponent],
  imports: [
    CommonModule,
    KantuRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HeadModule,
    FooterModule,
    NzImageModule
  ],
  exports: [
    KantuComponent
  ]
})
export class KantuModule { }

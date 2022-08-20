import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { MyinfoRoutingModule } from './myinfo-routing.module';
import { MyinfoComponent } from './myinfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../../widge/head/head.module';
import { FooterModule } from '../../widge/footer/footer.module';



@NgModule({
  declarations: [MyinfoComponent],
  imports: [
    CommonModule,
    MyinfoRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    HeadModule,
    FooterModule
  ]
})
export class MyinfoModule { }

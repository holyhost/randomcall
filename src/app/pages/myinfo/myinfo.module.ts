import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { MyinfoRoutingModule } from './myinfo-routing.module';
import { MyinfoComponent } from './myinfo.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../head/head.module';
import { FooterModule } from '../footer/footer.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  declarations: [MyinfoComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    MyinfoRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    HeadModule,
    FooterModule,
    NzFormModule
  ]
})
export class MyinfoModule { }

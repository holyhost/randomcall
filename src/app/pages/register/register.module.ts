import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../../widge/head/head.module';
import { FooterModule } from '../../widge/footer/footer.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RegisterRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HeadModule,
    FooterModule,
    HeadModule,
    FooterModule,
    NzFormModule
  ]
})
export class RegisterModule { }

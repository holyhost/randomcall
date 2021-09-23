import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../head/head.module';
import { FooterModule } from '../footer/footer.module';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HeadModule,
    FooterModule,
    NzFormModule
  ]
})
export class LoginModule { }

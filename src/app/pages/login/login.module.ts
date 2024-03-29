import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../../widge/head/head.module';
import { FooterModule } from '../../widge/footer/footer.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NzAlertModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HeadModule,
    FooterModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule
  ]
})
export class LoginModule { }

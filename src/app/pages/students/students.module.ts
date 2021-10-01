import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { StudentsRoutingModule } from './students-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../head/head.module';
import { FooterModule } from '../footer/footer.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StudentsComponent } from './students.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    StudentsRoutingModule,
    TranslateModule,
    FormsModule,
    NzTableModule,
    ReactiveFormsModule,
    FooterModule,
    HeadModule,
    FooterModule,
    NzCollapseModule,
    NzInputModule,
    NzFormModule
  ]
})
export class StudentsModule { }

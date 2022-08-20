import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { StudentsRoutingModule } from './students-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../../widge/head/head.module';
import { FooterModule } from '../../widge/footer/footer.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { StudentsComponent } from './students.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzRadioModule,
    NzAlertModule,
    StudentsRoutingModule,
    TranslateModule,
    FormsModule,
    NzTableModule,
    ReactiveFormsModule,
    HeadModule,
    FooterModule,
    NzCollapseModule,
    NzInputModule,
    NzFormModule
  ]
})
export class StudentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { ScoreRoutingModule } from './score-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeadModule } from '../../widge/head/head.module';
import { FooterModule } from '../../widge/footer/footer.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ScoreComponent } from './score.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [ScoreComponent],
  imports: [
    CommonModule,
    NzCardModule,
    ScoreRoutingModule,
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
export class ScoreModule { }

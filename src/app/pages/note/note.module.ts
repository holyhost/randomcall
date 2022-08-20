import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NoteRoutingModule } from './note-routing.module';
import { FooterModule } from 'src/app/widge/footer/footer.module';
import { HeadModule } from 'src/app/widge/head/head.module';



@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    NoteRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HeadModule,
    FooterModule,
  ]
})
export class NoteModule { }

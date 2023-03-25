import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KantuComponent } from './kantu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FooterModule } from 'src/app/widge/footer/footer.module';
import { HeadModule } from 'src/app/widge/head/head.module';
import { NoteRoutingModule } from '../note/note-routing.module';

@NgModule({
  declarations: [KantuComponent],
  imports: [
    CommonModule,
    NoteRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HeadModule,
    FooterModule,
  ],
  exports: [
    KantuComponent
  ]
})
export class KantuModule { }

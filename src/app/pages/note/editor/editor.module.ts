import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NoteEditorComponent } from './editor.component';
import { NoteEditorRoutingModule } from './editor-routing.module';
import { HeadModule } from 'src/app/widge/head/head.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [NoteEditorComponent],
  imports: [
    MarkdownModule.forChild(),
    CommonModule,
    NoteEditorRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HeadModule,
  ]
})
export class NoteEditorModule { }

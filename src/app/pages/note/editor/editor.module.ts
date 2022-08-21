import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NoteEditorComponent } from './editor.component';
import { NoteEditorRoutingModule } from './editor-routing.module';
import { HeadModule } from 'src/app/widge/head/head.module';
import { MarkdownModule } from 'ngx-markdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [NoteEditorComponent],
  imports: [
    MarkdownModule.forChild(),
    CommonModule,
    NoteEditorRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzTagModule,
    HeadModule,
  ]
})
export class NoteEditorModule { }

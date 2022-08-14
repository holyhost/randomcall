import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NoteEditorComponent } from './editor.component';
import { NoteEditorRoutingModule } from './editor-routing.module';
import { HeadModule } from 'src/app/widge/head/head.module';

@NgModule({
  declarations: [NoteEditorComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NoteEditorRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    HeadModule,
    NzFormModule
  ]
})
export class NoteEditorModule { }

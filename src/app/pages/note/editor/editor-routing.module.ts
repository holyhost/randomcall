import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteEditorComponent } from './editor.component';

const routes: Routes = [{ path: '', component: NoteEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteEditorRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KantuComponent } from './kantu.component';

const routes: Routes = [
  { path: '', component: KantuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KantuRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoldenComponent } from './golden.component';

const routes: Routes = [{ path: '', component: GoldenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoldenRoutingModule { }

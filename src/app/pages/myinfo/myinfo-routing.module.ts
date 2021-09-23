import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyinfoComponent } from './myinfo.component';

const routes: Routes = [{ path: '', component: MyinfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyinfoRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'setting', loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule) },
  { path: 'help', loadChildren: () => import('./pages/help/help.module').then(m => m.HelpModule) },
  { path: 'golden', loadChildren: () => import('./pages/golden/golden.module').then(m => m.GoldenModule) },
  { path: '', redirectTo: '/golden', pathMatch: 'full' },
  { path: '**', redirectTo: '/golden' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

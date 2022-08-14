import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'myinfo', loadChildren: () => import('./pages/myinfo/myinfo.module').then(m => m.MyinfoModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'setting', loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule) },
  { path: 'help', loadChildren: () => import('./pages/help/help.module').then(m => m.HelpModule) },
  { path: 'weather', loadChildren: () => import('./pages/help/help.module').then(m => m.HelpModule) },
  { path: 'golden',canActivate: [AuthGuard], loadChildren: () => import('./pages/golden/golden.module').then(m => m.GoldenModule) },
  { path: 'students',canActivate: [AuthGuard], loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule) },
  { path: 'score', loadChildren: () => import('./pages/score/score.module').then(m => m.ScoreModule) },
  { path: 'note', loadChildren: () => import('./pages/note/note.module').then(m => m.NoteModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

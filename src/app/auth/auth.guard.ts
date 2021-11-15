import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private data: DataService,private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state)
    console.log(state.root.queryParams)
    //no login input for login
    if(state && state.root && state.root.queryParams && state.root.queryParams.type){
      console.log("come  in")
      let params = state.root.queryParams;
      if(params.type && params.type==='info'){
        //check auth info
        return this.data.checkNoInputLogin(params.username,params.pwd);
        
      }
    }else{

      if(this.data.account && this.data.pwd){
        return true;
      }else{
        //跳转到登录界面
        this.data.redirectUrl = state.url;
        return this.router.parseUrl('/login')
      }
    }

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

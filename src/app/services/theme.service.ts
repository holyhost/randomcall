import { Injectable } from '@angular/core';

const app_name = 'random_call'
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  curTheme: string = '';//当前的主题
  themes = [
      {theme: 'theme1',color:'#3880ff'},
      {theme: 'theme2',color:'#69bb7b'},
      {theme: 'theme3',color:'#4abdac'},
      {theme: 'theme4',color:'#ffc409'},
      {theme: 'theme5',color:'#de6dfd'},
      {theme: 'theme6',color:'#f9aeae'},
  ]
  constructor() {
    
    this.initTheme();

   }


    //  初始化主题
    initTheme(){
      let theme = localStorage.getItem(app_name+"theme-style");
      // 如果用户之前设置过主题，就用之前那个主题
      if(theme){
        this.curTheme = theme;
        this.changeTheme(theme)
      }
    }
  
    //保存主题
    saveTheme(){
      localStorage.setItem(app_name+"theme-style",this.curTheme);
    }
  
    //改变主题
    changeTheme(type:string=''){
      if(!type){
        return
      }
      const body = document.getElementsByTagName('body')[0];
      this.curTheme = type
      body.setAttribute('theme-style',this.curTheme)
      this.saveTheme();
    }
}

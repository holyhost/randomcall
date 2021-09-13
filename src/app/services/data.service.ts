import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, timer } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/internal/operators';
import { Config } from './bean/config.constant';
import { Student } from './bean/student.type';

type AllClass = {
  id: number,
  className:string,
  students:Student[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isLoading: boolean = true
  allData: AllClass[] = []//所有班级及学生数据
  randomTime: number = 5;
  language=''
  constructor(
    public http: HttpClient,
    private i18n: TranslateService
  ) { 
    let time = this.getItem(Config.RandomTime)
    if(time){
      this.randomTime = Number.parseFloat(time)
    }
    this.initPersonData().subscribe(res=>{
      this.allData = res
      this.delayShow(1888)
    })

    let lan = this.getItem(Config.Language)
    if(lan){
      this.language = lan
      this.i18n.use(lan)
    }else{
      this.language = this.i18n.store.currentLang
    }
    
  }

  /**
   * 从assets文件中获取基础配置数据
   * @returns 所有班级数据
   */
  initPersonData():Observable<AllClass[]>{
    return this.http.get("./assets/persons.json").pipe(
      map((res: any[])=>{
        let allClass = new Array<AllClass>()
        //item 是班级
        let id =1;
        res.forEach(item=>{
          let stus = item.students.map((name:string)=>new Student(name,item.class))
          allClass.push({id:id,className:item.class,students:stus})
          id++
        })

        return allClass
      }),
      catchError(error=>{
        console.log(error)
        return []
      })
      )
  }

  getClassById(){

  }

  public changeLanguage(locale:string){
    this.i18n.use(locale);  
    this.language = locale
    this.setItem(Config.Language,locale)
  }


  private sleep(millisecond){
    return new Promise(resolve=>{
      setTimeout(() => {
        resolve('aaa')
      }, millisecond);
    })
  }

  /**
   * 延迟一段时间再显示界面
   * @param ms 延迟时间
   */
  async delayShow(ms = 3000){
    await this.sleep(ms);
    this.isLoading = false;
  }


  //  初始化主题
  getItem(key:string){
    let theme = localStorage.getItem(Config.AppName+key);
    // 如果用户之前设置过主题，就用之前那个主题
    if(theme){
      return theme
    }else{
      return '';
    }
  }

  //保存主题
  setItem(key:string,value:string){
    localStorage.setItem(Config.AppName+key,value);
  }


}

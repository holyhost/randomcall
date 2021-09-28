import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/internal/operators';
import { Config } from './bean/config.constant';
import { Student } from './bean/student.type';
import { environment } from 'src/environments/environment';

type AllClass = {
  id: number,
  className:string,
  students:Student[]
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  account = '';
  pwd = '';
  redirectUrl = '';
  proxy = "";
  isLoading: boolean = true
  allData: AllClass[] = []//所有班级及学生数据
  randomTime: number = 5;
  language=''
  constructor(
    public http: HttpClient,
    private i18n: TranslateService,
  ) { 
    if(!environment.production){
      this.proxy = "xampp/"
    }
    
    let time = this.getItem(Config.RandomTime)
    if(time){
      this.randomTime = Number.parseFloat(time)
    }
    this.readUserStatus();
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

  getLoading():Observable<Boolean>{
    return of(this.isLoading)
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

  login(params:any){
    this.isLoading = true;
    let dat = new Date();
    params.morep1 = this.randomString(dat.getMinutes()%5+4);
    params.morep2 = this.randomString(dat.getMinutes()%6+3);
    console.log(params)
    return this.http.post(this.proxy+"api/v1/user/login.php",params).pipe(
      map(data=>{
        console.log(typeof(data))
        console.log(data)
        this.isLoading = false
        return data;
      })
    )
  }
  register(params:any){
    this.isLoading = true;
    return this.http.post(this.proxy+"api/v1/user/register.php",params).pipe(
      map(data=>{
        console.log(typeof(data))
        console.log(data)
        this.isLoading = false
        return data;
      })
    )
  }

  logout(){
    this.isLoading = true;
    let params = {
      "username":this.account,
      "pwd2":this.pwd
    }
    return this.http.post(this.proxy+"api/v1/user/logout.php",params).pipe(
      map((data:any)=>{
        if(data && data.status&&data.status === 'ok'){
          this.setItem(Config.UserAccount,'');
        }
        this.isLoading = false
        return data;
      })
    )
  }

  getStudents(){
    this.isLoading = true;
    let params = {
      "teaname":this.account,
      "token":this.pwd
    }
    return this.http.post(this.proxy+"api/v1/student/get.php",params).pipe(
      map((data:any)=>{

        this.isLoading = false
        return data;
      })
    )
  }

  addStudents(clazname:string,stus: string[]){
    if(!this.account || !this.pwd){
      return of({
        status:'error',
        msg: '请重新登录'
      })
    }
    this.isLoading = true;
    let params = {
      "teaname":this.account,
      "token":this.pwd,
      "clazname":clazname,
      "students":stus,
    }
    return this.http.post(this.proxy+"api/v1/student/add.php",params).pipe(
      map((data:any)=>{
        this.isLoading = false
        return data;
      })
    )
  }




  randomString(e:number) {  
    e = e || 32
    let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"
    let a = t.length
    let n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
  }



  saveUserStatus(){
    if(this.account && this.pwd){
      let info = this.account +"_123_"+this.pwd+"_123_"+new Date().getTime().toString();
      // let result = window.atob(info)
      // console.log(result)
      this.setItem(Config.UserAccount,info)
    }
  }

  readUserStatus(){
    let info = this.getItem(Config.UserAccount)
    // console.log(info)
    // info = window.atob(info)
    // console.log(info)
    if(info){
      let result = info.split("_123_")
      console.log(1)
      if(result && result.length == 3){
        console.log(result[2])
        if(result[2]&&(Number.parseInt(result[2])-new Date().getTime())<10*24*60*60*1000){
          this.account = result[0]
          this.pwd = result[1]
          console.log(3)
        }
        
      }
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/internal/operators';
import { Config } from './bean/config.constant';
import { StuBean, Student } from './bean/student.type';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  randomTime: number = 5;//随机时间
  randomType: string = "C"
  language=''
  constructor(
    public http: HttpClient,
    private i18n: TranslateService,
    private message: NzMessageService
  ) { 
    
    if(!environment.production){
      this.proxy = "xampp/"
    }
    
    let time = this.getItem(Config.RandomTime)
    if(time){
      this.randomTime = Number.parseFloat(time)
    }
    let tempType = this.getItem(Config.RandomType)
    if(tempType){
      this.randomType = tempType;
    }
    this.readUserStatus();
    // this.initPersonData().subscribe(res=>{
    //   this.allData = res
    //   this.delayShow(1888)
    // })

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

  checkUserStatus(){
    this.isLoading = true;

    let params = {
      "username":this.account,
      "pwd":this.pwd,
      "userkey": this.randomString(9)
    }
    return this.http.post(this.proxy+"api/v1/user/check.php",params).pipe(
      map(data=>{
        this.isLoading = false
        return data;
      })
    )
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
    params.morep2 = this.randomString(dat.getMinutes()%6+4);

    return this.http.post(this.proxy+"api/v1/user/login.php",params).pipe(
      map(data=>{
        this.isLoading = false
        return data;
      })
    )
  }
  register(params:any){
    this.isLoading = true;
    return this.http.post(this.proxy+"api/v1/user/register.php",params).pipe(
      map(data=>{

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

  /**
   * 成绩单列表
   * @returns 
   */
  getScoreList(){
   
    let params = {
      "teaname":this.account,
      "token":this.pwd
    }
    return this.http.post(this.proxy+"api/v1/gradle/get.php",params).pipe(
      map((data:any)=>{
        return data;
      })
    )
  }

    /**
   * 单个成绩单内容列表
   * @returns 
   */
     getGradleList(gid:string){
      this.isLoading = true;
      let params = {
        "teaname":this.account,
        "token":this.pwd,
        "gid":gid
      }
      return this.http.post(this.proxy+"api/v1/gradle/detail.php",params).pipe(
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
      if(result && result.length == 3){
        if(result[2]&&(Number.parseInt(result[2])-new Date().getTime())<10*24*60*60*1000){
          this.account = result[0]
          this.pwd = result[1]
        }
        
      }
    }
  }

  updateScore(sid:number,score:number,type=1){
    let params = {
        "teaname": this.account,
        "stuid": sid,
        "type": type,
        "token": this.pwd,
        "score": score
    }
    return this.http.post(this.proxy+"api/v1/student/score.php",params).pipe(
      map((data:any)=>{
        this.isLoading = false
        return data;
      })
    )
  }

  updateStuInfo(sid:number,data:any,type=1){
    let params = {
        "teaname": this.account,
        "stuid": sid,
        "type": type,
        "token": this.pwd,
        "sex": type==2?data:null,
        "sname": type==1?data:null,
    }
    return this.http.post(this.proxy+"api/v1/student/update.php",params).pipe(
      map((data:any)=>{
        this.isLoading = false
        return data;
      })
    )
  }

  addGradleInfo(title:string,data:any,clazname:string="未命名",subject:string=''){
    if(!title || title.length<1){
      let date = new Date();
      
      title = clazname+(date.getMonth()+1)+"月"+date.getDate()+"日成绩单"
    }
    let params = {
        "teaname": this.account,
        "clazname": clazname,
        "token": this.pwd,
        "title": title,
        "subject": subject,
        "gid": "gid_"+this.randomString(5)+"_"+new Date().getTime(),
        "datalist": data
    }
    return this.http.post(this.proxy+"api/v1/gradle/add.php",params).pipe(
      map((data:any)=>{
        this.isLoading = false
        console.log(data)
        return data;
      })
    )
  }
  updateGradleInfo(id:string,score:string=''){

    let params = {
        "teaname": this.account,
        "id": id,
        "token": this.pwd,
        "type": 1,
        "score": score,

    }
    return this.http.post(this.proxy+"api/v1/gradle/update.php",params).pipe(
      map((data:any)=>{
        this.isLoading = false
        console.log(data)
        return data;
      })
    )
  }

  showMessage(text:string = ''){
    this.message.success(text);
  }
  showMessageError(text:string = ''){
    this.message.error(text);
  }

  getCallRecord(clazname:string){
    return this.getItem(this.account+"_"+clazname);
  }
  setCallRecord(data:string,clazname){
    this.setItem(this.account+"_"+clazname,data);
  }

  initCallData(stuArr:StuBean[],clazname:string){
    let his = this.getCallRecord(clazname);
    if(!his || his.length<2){
      return stuArr;
    }
    let tempArr:StuBean[] = [];
    let spArr=his.split("_");
    if(spArr.length>stuArr.length*0.8){
      this.setCallRecord('',clazname);
      return stuArr;
    }
    for (let index = 0; index < stuArr.length; index++) {
      const element = stuArr[index];
      if(his.indexOf(element.name)<0){
        tempArr.push(element);
      }
    }
  
    return tempArr;
  }
}

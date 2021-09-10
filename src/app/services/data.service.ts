import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable, timer } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/internal/operators';
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
  constructor(
    public http: HttpClient
  ) { 
    
    this.initPersonData().subscribe(res=>{
      this.allData = res
      this.delayShow(1888)
    })
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
}

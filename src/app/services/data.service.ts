import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { Student } from './bean/student.type';

type AllClass = {
  className:string,
  students:Student[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allData: AllClass[] = []//所有班级及学生数据
  constructor(
    public http: HttpClient
  ) { 
    this.initPersonData().subscribe(res=>this.allData = res)
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
        res.forEach(item=>{
          let stus = item.students.map((name:string)=>new Student(name,item.class))
          allClass.push({className:item.class,students:stus})
        })
        return allClass
      }),
      catchError(error=>{
        console.log(error)
        return []
      })
      )
  }
}

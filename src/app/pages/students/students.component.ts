import { Component, OnInit } from '@angular/core';
import { ClasBean, StuBean } from 'src/app/services/bean/student.type';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  radioValue = 'E';
  stuArea:string = '';
  newClassName = '';
  dataList: ClasBean [] = [];
  formatResult = -1;
  formatErrormsg = '格式化数据有误';

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.initMyStudents();
  }

  initMyStudents(){
    this.data.isLoading = true;
    this.data.getStudents().subscribe(res=>{
      this.data.isLoading = false;
    
      if(res && res.status && res.status ==='ok'){
        let temArr: StuBean[] = res.data;
        temArr.forEach(stu=>{
          let tempFind = this.dataList.find(item=>item &&(item.name === stu.curClass));
          if(tempFind){
            tempFind.stu.push(new StuBean(stu.name,stu.curClass))
          }else{
            let legth = this.dataList.push({name: stu.curClass,stu: []})
            this.dataList[legth-1].stu.push(new StuBean(stu.name,stu.curClass))
          }
        })
      }
    },err=>{
      console.log(err)
      this.data.isLoading = false;
    })
  }


  formatStuArea(){
    console.log(this.stuArea)
    console.log(this.radioValue)
    if(this.stuArea && this.stuArea.length>1){
      let splitStr = '';
      if(this.stuArea.includes(',')){
        splitStr = ',';
      }
      if(this.stuArea.includes('，')){
        splitStr = '，';
      }
      if(!splitStr && this.stuArea.length>8){
        this.formatResult = 0;
        this.formatErrormsg = '添加失败，名字最长8个字！';
        return;
      }else{

      }
      let names = [];
      if(!splitStr){
        names.push(this.stuArea)
      }else{
        names = this.stuArea.split(splitStr)
      }
       
      names = names.filter(item=>item&&item.trim().length>0)
      this.data.addStudents(this.getChoosedClass(),names).subscribe(res=>{
        if(res && res.status && res.status==='ok'){
          this.formatResult = 1;
          this.stuArea = '';
          this.newClassName = '';
          this.initMyStudents();
        }else{
          this.formatErrormsg = res.msg;
          this.formatResult = 0;
        }
      },err=>{
        console.log(err)
        this.formatResult = 0;
        this.formatErrormsg = '网络请求失败'
      });
    }else{
      this.formatResult = 0;
    }
  }

  getChoosedClass(){
    if(this.radioValue === 'E'){
      return this.newClassName;
    }else{
      return this.dataList[Number.parseInt(this.radioValue.replace('a',''))].name
    }
  }

}

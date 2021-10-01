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
  classStatus: any[]= [];

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
          this.classStatus.push({"detail": false})
          if(tempFind){
            tempFind.stu.push(stu)
          }else{
            let legth = this.dataList.push({name: stu.curClass,stu: []})
            this.dataList[legth-1].stu.push(stu)
          }
        })
        console.log(this.dataList)
      }
    },err=>{
      console.log(err)
      this.data.isLoading = false;
    })
  }

  onClassCollapseChange(status,index:number){

    console.log(status)
    console.log(index)
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

  i = 0;
  editId: string | null = null;
  tempName= "";
  startEdit(id: string,name:string): void {
    this.editId = id;
    this.tempName = name;
    setTimeout(() => {
      document.getElementById("input_"+id).focus();
    }, 300);
    
  }

  stopEdit(id: string,name: string): void {
    console.log("stop-edit")
    this.editId = null;
    if(this.tempName === name){
      console.log("名字没有变化")
      return;
    }
    
    //保存数据
    this.data.updateStuInfo(Number.parseInt(id),name,1).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.data.showMessage("更新名称成功！")
      }else{
        this.data.showMessageError("更新名字失败！")
      }
    },err=>{
      console.log(err)
      this.data.showMessageError("更新名字失败！")
    })
  }

  addRow(): void {

  }

  deleteRow(id: string): void {
    console.log(id)
    
  }

  onDetailClick(index:number){
    this.classStatus[index].detail = !this.classStatus[index].detail
  }

}

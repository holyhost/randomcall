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
  editId: string | null = null;
  tempName= "";
  editSex: string | null = null;
  tempSex: string = '';
  editScore: string | null = null;
  tempScore: string = '';

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.initMyStudents();
  }

  initMyStudents(){
    this.data.sendLoadingMessage()
    this.data.getStudents().subscribe(res=>{
      this.data.sendLoadingMessage(false)
    
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
        // console.log(this.dataList)
      }
    },err=>{
      // console.log(err)
      this.data.sendLoadingMessage(false)
    })
  }

  onClassCollapseChange(status,index:number){

  }


  formatStuArea(){

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
        // console.log(err)
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


  startEdit(id: string,name:string): void {
    this.editId = id;
    this.tempName = name;
    setTimeout(() => {
      document.getElementById("input_name_"+id).focus();
    }, 300);
    
  }
  startEditSex(id: string,sex:string): void {
    this.editSex = 'input_sex_'+id
    this.tempSex = sex;
    setTimeout(() => {
      document.getElementById("input_sex_"+id).focus();
    }, 300);
    
  }
  startEditScore(id: string,score:string): void {
    this.editScore = 'input_score_'+id
    this.tempScore = score;
    setTimeout(() => {
      document.getElementById("input_score_"+id).focus();
    }, 300);
    
  }

  stopEdit(id: string,name: string): void {
    
    this.editId = null;
    if(this.tempName === name || this.tempName.length<1){
      // console.log("名字没有变化")
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
  stopEditSex(id: string,sex: string): void {
    // console.log("stop-edit")
    this.editSex = null;
    if(this.tempSex === sex || this.tempSex.length<1){
      
      return;
    }
    
    //保存数据
    this.data.updateStuInfo(Number.parseInt(id),sex,2).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.data.showMessage("更新性别成功！")
      }else{
        this.data.showMessageError("更新性别失败！")
      }
    },err=>{
      console.log(err)
      this.data.showMessageError("更新性别失败！")
    })
  }
  stopEditScore(id: string,score: string): void {
    // console.log("stop-edit")
    this.editScore = null;
    if(this.tempScore === score || this.tempScore.length<1){
      
      return;
    }
    
    //保存数据
    this.data.updateScore(Number.parseInt(id),Number.parseInt(score),3).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.data.showMessage("更新分数成功！")
      }else{
        this.data.showMessageError("更新分数失败！")
      }
    },err=>{
      console.log(err)
      this.data.showMessageError("更新分数失败！")
    })
  }

  addRow(): void {

  }

  deleteRow(i:number,id: string): void {
    
    //删除
    this.data.updateStuInfo(Number.parseInt(id),'',4).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.data.showMessage("删除成功！")
        this.dataList[i].stu = this.dataList[i].stu.filter(d => d.id !== id);
        this.dataList[i].stu.forEach((item,index)=>item.id===id&&this.dataList[i].stu.splice(index,1))
      }else{
        this.data.showMessageError("删除失败！")
      }
    },err=>{
      // console.log(err)
      this.data.showMessageError("删除失败！")
    })
    
  }

  onDetailClick(index:number){
    this.classStatus[index].detail = !this.classStatus[index].detail
  }

}

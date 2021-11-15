import { Component, OnInit } from '@angular/core';
import { GradleBean } from 'src/app/services/bean/gradle.type';
import { ScoreBean } from 'src/app/services/bean/score.type';
import { ClasBean, StuBean } from 'src/app/services/bean/student.type';
import { DataService } from 'src/app/services/data.service';
import * as XLSX from 'xlsx';

type AOA = any[][];

type GradleType = {
  detail: boolean,
  gradle: GradleBean,
  data: GradleBean[]
}

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  excelData: AOA = [ [1, 2], [3, 4] ];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'Sheet.xlsx';
	scoreName: string = '';
	ver: string = XLSX.version;
  tempTableData: ScoreBean[] = [];
  curClass = '';
  tempSubject:string = '';//科目
  curStudents :ClasBean[] = [];
  gradleList: GradleType[] = []



  dataList: ClasBean [] = [];
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
    this.initMyScoreList();
    this.initMyStudents();
  }
  initMyScoreList(){
    this.data.getScoreList().subscribe(res=>{
      if(res && res.status && res.status ==='ok'){
        this.gradleList = []
        res.data.forEach(item => this.gradleList.push({detail:false,'gradle':item,'data':[]}));
        
      }
    },err=>{
      // console.log(err)
      this.data.isLoading = false;
    })
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
        // this.curClass = this.dataList[0].name
        // this.onClassChange(this.curClass)

      }
    },err=>{
      // console.log(err)
      this.data.isLoading = false;
    })
  }


  initTempTableData(){
    this.dataList.forEach(item=>{
      if(item.name === this.curClass){
        item.stu.forEach(i=>this.tempTableData.push(new ScoreBean(i.name,null)))
      }
    })
  }

  onClassCollapseChange(status,index:number){
    if(status && (!this.gradleList[index].data|| this.gradleList[index].data.length<1)){
      this.data.isLoading = true;
      //获取详情
      this.data.getGradleList(this.gradleList[index].gradle.g_id).subscribe(res=>{
        this.data.isLoading = false;
    
        if(res && res.status && res.status ==='ok'){
          this.gradleList[index].data = res.data;
        }
      },err=>{
        // console.log(err)
        this.data.isLoading = false;
      })
    }
  }

  onClassChange(res){
    this.curClass = res
    this.tempTableData = []
    if(res){
      this.initTempTableData();
    }
    
  }



  startEdit(id: string,name:string,detail:boolean): void {
    if(!detail){
      return
    }
    this.editId = id;
    this.tempName = name;
    setTimeout(() => {
      document.getElementById("input_name_"+id).focus();
    }, 300);
    
  }
  startEditSex(id: string,sex:string,detail:boolean): void {
    if(!detail){
      return;
    }
    this.editSex = 'input_sex_'+id
    this.tempSex = sex;
    setTimeout(() => {
      document.getElementById("input_sex_"+id).focus();
    }, 300);
    
  }
  startEditScore(id: string,score:string,detail:boolean): void {
    // console.log(id,detail)
    if(!detail){
      return;
    }
    this.editScore = 'input_score_'+id
    this.tempScore = score;
    setTimeout(() => {
      document.getElementById("input_score_"+id).focus();
    }, 300);
    
  }

  stopEdit(id: string,name: string): void {
    // console.log("stop-edit")
    this.editId = null;
    if(this.tempName === name || this.tempName.length<1){
      // console.log("名字没有变化")
      return;
    }
    
    //保存数据
    // this.data.updateStuInfo(Number.parseInt(id),name,1).subscribe(res=>{
    //   if(res && res.status && res.status==='ok'){
    //     this.data.showMessage("更新名称成功！")
    //   }else{
    //     this.data.showMessageError("更新名字失败！")
    //   }
    // },err=>{
    //   console.log(err)
    //   this.data.showMessageError("更新名字失败！")
    // })
  }
  stopEditSex(id: string,sex: string): void {
    // console.log("stop-edit")
    this.editSex = null;
    if(this.tempSex === sex || this.tempSex.length<1){
      
      return;
    }
    
    //保存数据
    // this.data.updateStuInfo(Number.parseInt(id),sex,2).subscribe(res=>{
    //   if(res && res.status && res.status==='ok'){
    //     this.data.showMessage("更新性别成功！")
    //   }else{
    //     this.data.showMessageError("更新性别失败！")
    //   }
    // },err=>{
    //   console.log(err)
    //   this.data.showMessageError("更新性别失败！")
    // })
  }
  stopEditScore(id: string,score: string): void {
    // console.log("stop-edit")
    this.editScore = null;
    if(this.tempScore === score || this.tempScore.length<1){
      // console.log("no change")
      return;
    }
    
    //保存数据
    this.data.updateGradleInfo(id,score).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.data.showMessage("更新分数成功！")
      }else{
        this.data.showMessageError("更新分数失败！")
      }
    },err=>{
      // console.log(err)
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
    this.gradleList[index].detail = !this.gradleList[index].detail
  }

  onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
      // console.log("--")
			const ab: ArrayBuffer = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(ab,{type: 'array'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.excelData = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
		};
		reader.readAsArrayBuffer(target.files[0]);
	}

	exportExcel(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.excelData);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
	}

  addTempRow(){
    if(!this.tempTableData || this.tempTableData.length<1){
      this.tempTableData = []
    }
    this.tempTableData.push(new ScoreBean('',null))
  }

  deleteTempRow(index:number){
    this.tempTableData.splice(index,1)
  }

  exportTempTable(){
    /* generate worksheet */
    let tempArray: any[] = [];
    this.tempTableData.forEach((item,index)=>{
      if(item && item.name){
        tempArray.push({
          "序号":index+1,
          "姓名":item.name,
          "分数":item.score,
        })
      }
    })
    if(tempArray.length<1){
      return;
    }
    this.exportExcelFile(this.scoreName,tempArray)
  }

  exportGradleExcel(excelName:string,gradles: GradleBean[]){
    if(gradles && gradles.length>1){
      let tempArray: any[] = [];
      gradles.forEach((item,index)=>{
        tempArray.push({
          "序号":index+1,
          "姓名":item.sname,
          "分数":item.g_value,
        })
      })
      this.exportExcelFile(excelName,tempArray)
    }else{
      this.data.showMessageError("数据为空，导出Excel失败！")
    }
  }

  exportExcelFile(fileName:string,dataArray:any[]){
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataArray);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, fileName+".xlsx");
  }

  finishTempTable(){
    
    this.data.addGradleInfo(this.scoreName,this.tempTableData,this.curClass,this.tempSubject).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.data.showMessage("录入成绩单成功！")
        this.tempTableData = []
        this.initMyScoreList();
      }else{
        this.data.showMessageError("录入成绩单失败！")
      }
    },err=>{
      // console.log(err)
      this.data.showMessageError("录入成绩单失败！")
    })
  }

}

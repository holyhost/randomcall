import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClasBean, StuBean } from 'src/app/services/bean/student.type';
import { DataService } from 'src/app/services/data.service';

/**
 * 点名组件
 */
@Component({
  selector: 'app-golden',
  templateUrl: './golden.component.html',
  styleUrls: ['./golden.component.scss']
})
export class GoldenComponent implements OnInit,AfterViewInit {

  curClass = '';
  curStudents :ClasBean[] = [];
  state = 0;//定义状态，开始和结束
  t:any;
  tout:any
  // btnText: string = '开始';
  luckyName: string = '随机点名';
  luckyStu: StuBean = null;

  constructor(public data:DataService) { }

  ngOnInit() {
    this.initMyStudents();

    
  }

  ngAfterViewInit(): void {
    
  }


  onStart(){
    let choosedClass = this.curStudents.find(item=>item.name === this.curClass)
    if(!choosedClass || choosedClass.stu.length<1){
      return
    }
    let arr = this.filterData(choosedClass.stu,this.data.randomType)
    clearTimeout(this.tout)
    if (this.state == 0) {
      //如果是0即开始随机，变为1时结束，不是0时执行else
      clearInterval(this.t);
      this.t = setInterval( ()=>{
        // console.log(1);
        var sj = Math.round(Math.random() * (arr.length - 1));
        this.luckyName = arr[sj].name;
        this.luckyStu = arr[sj]
      }, 37)
      // this.btnText = "结束"//更改按钮的内容
      this.state=1;
      this.tout = setTimeout(() => {
        this.state=0;
        clearInterval(this.t);
        // this.btnText = '开始'
        if(this.data.randomType === "C"){
          this.data.setCallRecord(this.data.getCallRecord(this.curClass)+"_"+this.luckyName,this.curClass);
        }
      }, this.data.randomTime*1000+Math.round(Math.random() * 1000));

    }else{
      this.state=0;
      clearInterval(this.t);
      // this.btnText = '开始'
      if(this.data.randomType === "C"){
        this.data.setCallRecord(this.data.getCallRecord(this.curClass)+"_"+this.luckyName,this.curClass);
      }
    }

  }



  initMyStudents(){
    this.data.getStudents().subscribe(res=>{
      this.data.sendLoadingMessage(false)
    
      if(res && res.status && res.status ==='ok'){
        let temArr: StuBean[] = res.data;
        this.curStudents = []
        temArr.forEach((stu)=>{
          let tempFind = this.curStudents.find(item=>item &&(item.name === stu.curClass));
          stu.score = Number.parseInt(stu.score+"");
          if(tempFind){
            tempFind.stu.push(stu)
          }else{
            let legth = this.curStudents.push({name: stu.curClass,stu: []})
            this.curStudents[legth-1].stu.push(stu)
            this.curClass = stu.curClass;
          }
        })
        // console.log(this.curStudents)
        if(this.curStudents && this.curStudents.length>0){
          this.curClass = this.curStudents[0].name
        }
      }
    },err=>{
      // console.log(err)
      this.data.sendLoadingMessage(false)
      this.data.showMessageError("加载学生信息失败！")
    })
  }

  /**
   * 每次切换班级，学生信息重置
   * @param res 班级信息
   */
  onClassChange(res){
    // console.log(res)
    this.luckyStu = null
    this.luckyName = '随机点名';
  }


  updateScore(score=0){
    // console.log(this.luckyStu)
    this.data.updateScore(Number.parseInt(this.luckyStu.id+""),score,1).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.luckyStu.score = this.luckyStu.score + score;
        
      }else{
        //show error
        this.data.showMessage(res&&res.msg?res.msg:"修改分数失败")
      }
    },err=>{
      // console.log(err)
      this.data.showMessage("修改分数失败")
      //show error
    });
  }

  
  filterData(arr:StuBean[],type:string){
    if(!arr || arr.length<1){
      return arr;
    }
    let total = 0
    arr.map(item=>total+=item.score)
    let avg = total/arr.length;

    switch (type) {
      case "A":
        
        break;
      case "B":
        let tempArr:StuBean[] = [];
        arr.map(item=>{
          if(item.score<avg){
            tempArr.push(item)
          }
        })
        if(tempArr.length<arr.length*0.85){
          arr = tempArr
        }
        break;
      case "C":
        arr = this.data.initCallData(arr,this.curClass);
        break;
    
      default:
        break;
    }

    return arr
  }


}

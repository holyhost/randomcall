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
    let arr = choosedClass.stu
    clearTimeout(this.tout)
    if (this.state == 0) {
      //如果是0即开始随机，变为1时结束，不是0时执行else
      clearInterval(this.t);
      this.t = setInterval( ()=>{
        // console.log(1);
        var sj = Math.round(Math.random() * (arr.length - 1));
        this.luckyName = arr[sj].name;
        this.luckyStu = arr[sj]
        console.log(this.luckyStu.score)
      }, 37)
      // this.btnText = "结束"//更改按钮的内容
      this.state=1;
      this.tout = setTimeout(() => {
        this.state=0;
        clearInterval(this.t);
        // this.btnText = '开始'
      }, this.data.randomTime*1000+Math.round(Math.random() * 1000));

    }else{
      this.state=0;
      clearInterval(this.t);
      // this.btnText = '开始'
    }

  }



  initMyStudents(){
    this.data.isLoading = true;
    this.data.getStudents().subscribe(res=>{
      this.data.isLoading = false;
    
      if(res && res.status && res.status ==='ok'){
        let temArr: StuBean[] = res.data;
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
      }
    },err=>{
      console.log(err)
      this.data.isLoading = false;
    })
  }

  /**
   * 每次切换班级，学生信息重置
   * @param res 班级信息
   */
  onClassChange(res){
    this.luckyStu = null
  }


  updateScore(score=0){
    console.log(this.luckyStu)
    this.data.updateScore(Number.parseInt(this.luckyStu.id+""),score,1).subscribe(res=>{
      if(res && res.status && res.status==='ok'){
        this.luckyStu.score = this.luckyStu.score + score;
        
      }else{
        //show error
        this.data.showMessage(res&&res.msg?res.msg:"修改分数失败")
      }
    },err=>{
      console.log(err)
      this.data.showMessage("修改分数失败")
      //show error
    });
  }

}

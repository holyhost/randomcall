import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-golden',
  templateUrl: './golden.component.html',
  styleUrls: ['./golden.component.scss']
})
export class GoldenComponent implements OnInit,AfterViewInit {

  curClass = '';
  curStudents = []
  state = 0;//定义状态，开始和结束
  t:any;
  tout:any
  btnText: string = '开始';
  luckyName: string = '随机点名';

  constructor(public data:DataService) { }

  ngOnInit() {
    this.curClass = this.data.allData[0].className
    
  }

  ngAfterViewInit(): void {
    
  }


  onStart(){
    let choosedClass = this.data.allData.find(item=>item.className === this.curClass)
    if(!choosedClass || choosedClass.students.length<1){
      return
    }
    let arr = choosedClass.students
    clearTimeout(this.tout)
    if (this.state == 0) {
      //如果是0即开始随机，变为1时结束，不是0时执行else
      clearInterval(this.t);
      this.t = setInterval( ()=>{
        // console.log(1);
        var sj = Math.round(Math.random() * (arr.length - 1));
        this.luckyName = arr[sj].name;
      }, 37)
      this.btnText = "结束"//更改按钮的内容
      this.state=1;
      this.tout = setTimeout(() => {
        this.state=0;
        clearInterval(this.t);
        this.btnText = '开始'
      }, this.data.randomTime*1000+Math.round(Math.random() * 1000));

    }else{
      this.state=0;
      clearInterval(this.t);
      this.btnText = '开始'
    }

  }
}

import { Component, OnInit } from '@angular/core';
import { Gushi } from 'src/app/services/bean/gushi.type';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-kantu',
  templateUrl: './kantu.component.html',
  styleUrls: ['./kantu.component.scss']
})
export class KantuComponent implements OnInit {


  shiList: Gushi[] = []
  imglist: any[] = []
  page = 0 //当前第几页
  constructor(
    public data: DataService
  ) { }

  ngOnInit() {
    this.getImageList(this.page)
  }


  initDefaultGushi(){
    console.log("come in")

  }

  getImageList(page=0){
    let params = {
      type: "游戏",
      page: page
    }
    this.data.getImages(params).subscribe(res=>{
      if(this.page == 0) this.imglist = []
      if(res && res.status && res.status === "ok"){
        res.data.map(item=>{
          item.spath = "https://pojun.top/app/" +item.spath
          this.imglist.push(item)
        })
      }
    })
  }

  onImageClick(pos:number){
    console.log("click"+pos)
  }

  onLoadMore(){
    this.page ++
    this.getImageList(this.page)
  }

}

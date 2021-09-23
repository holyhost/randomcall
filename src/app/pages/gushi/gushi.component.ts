import { Component, OnInit } from '@angular/core';
import { Gushi } from 'src/app/services/bean/gushi.type';

@Component({
  selector: 'app-gushi',
  templateUrl: './gushi.component.html',
  styleUrls: ['./gushi.component.scss']
})
export class GushiComponent implements OnInit {


  shiList: Gushi[] = []

  constructor() { }

  ngOnInit() {
    this.initDefaultGushi()
  }

  initDefaultGushi(){

    let gs1 = new Gushi("杜甫","望岳",[
      "岱宗夫如何？齐鲁青未了。",
      "造化钟神秀，阴阳割昏晓。",
      "荡胸生曾云，决眦入归鸟。",
      "会当凌绝顶，一览众山小。",
    ])
    let gs2 = new Gushi("刘禹锡","酬乐天扬州初逢席上见赠",[
      "巴山楚水凄凉地，二十三年弃置身。",
      "怀旧空吟闻笛赋，到乡翻似烂柯人。",
      "沉舟侧畔千帆过，病树前头万木春。",
      "今日听君歌一曲，暂凭杯酒长精神。",
    ])
    let gs3 = new Gushi("苏轼","题西林壁",[
      "横看成岭侧成峰，",
      "远近高低各不同。",
      "不识庐山真面目，",
      "只缘身在此山中。",
    ])
    let gs4 = new Gushi("欧阳修","蝶恋花",[
      "庭院深深深几许？",
      "杨柳堆烟，帘幕无重数。",
      "玉勒雕鞍游冶处，楼高不见章台路。",
      "雨横风狂三月暮，",
      "门掩黄昏，无计留春住。",
      "泪眼问花花不语，",
      "乱红飞过秋千去。",
    ])
    let gs5 = new Gushi("王之涣","登鹳雀楼",[
      "白日依山尽，",
      "黄河入海流。",
      "欲穷千里目，",
      "更上一层楼。",
    ])
    let gs6 = new Gushi("柳宗元","江雪",[
      "千山鸟飞绝，",
      "万径人踪灭。",
      "孤舟蓑笠翁，",
      "独钓寒江雪。",
    ])
    this.shiList.push(gs1)
    this.shiList.push(gs5)
    this.shiList.push(gs6)
    this.shiList.push(gs2)
    this.shiList.push(gs3)
    this.shiList.push(gs4)


  }

}

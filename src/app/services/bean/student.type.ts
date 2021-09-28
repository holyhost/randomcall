/**
 * 学生实体类
 */
export class Student {

    public id: number;//id,唯一标识
    public name: string;//名字
    public className: string;//班级
    public sex: string;    // 性别
    public icon: string; //头像
    public duty: string; //职务，班长，课代表之类
    public age: number; //年龄


    constructor(name:string,className='',sex='',icon='',duty='',age=0){
        this.name = name
        this.className = className
        this.sex = sex
        this.icon = icon
        this.duty = duty
        this.age = age

    }

}

export class StuBean {
    public id:string;// 0,
    public name:string;// "哥耍耍",
    public birth:string;// null,
    public curClass:string;// "高一三班",
    public sex:string;// "男",
    public icon:string;// null,
    public qq:string;// null,
    public wx:string;// null,
    public stuno:string;// null,
    public teaname:string;// "admin12"
    public score:number;// 分数

    constructor(name:string,className=''){
        this.name = name
        this.curClass = className

    }

}

export class ClasBean {
    public name:string
    public stu: StuBean[]
    
  }
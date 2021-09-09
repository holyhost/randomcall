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
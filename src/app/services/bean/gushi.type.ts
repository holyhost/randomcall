/**
 * 古诗
 */
 export class Gushi {

    public id: number;//id,唯一标识
    public name: string;//名字
    public title: string;//
    public subtitle: string;//
    public sex: string;    // 性别
    public icon: string; //头像
    public period: string; //时期，几几年到几几年
    public dynasty: string; //朝代
    public shiju: string[]; //诗句


    constructor(name:string,title:string,shiju:string[],icon='#icon-xitong-copy'){
        this.name = name
        this.title = title
        this.shiju = shiju
        this.icon = icon


    }

}
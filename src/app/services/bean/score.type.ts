/**
 * 加分减分记录
 */
 export class ScoreBean {

    public id: number;//id,唯一标识
    public name: string;//名字
    public score: number;//分数



    constructor(name:string,score:number){
        this.name = name
        this.score = score
    }

}
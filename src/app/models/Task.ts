export class Task{
  public id:number;
  public taskName:string;
  public isDone:boolean;

  constructor(id:number, taskName:string, isDone:boolean){
    this.id = id;
    this.taskName = taskName;
    this.isDone = isDone;
  }
}

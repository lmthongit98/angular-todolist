import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  public taskList : Task[];


  constructor() {
    this.taskList = [
      new Task(this.generateID(), 'Study LifeCycle Hook', false),
      new Task(this.generateID(), 'Study Route and Navigation', false),
      new Task(this.generateID(), 'Study CLI', false),
      new Task(this.generateID(), 'Study Component', true),
      new Task(this.generateID(), 'Study Directive', true),
    ]
  }

  public getTaskList():Task[]{
    return this.taskList;
  }

  public addTask(task: Task){
    this.taskList.push(task);
  }

  public deleteTask(id:number){
    this.taskList = this.taskList.filter(task => task.id != id);
  }

  generateID():number{
    return Math.floor(Math.random() * Date.now());
  }

}

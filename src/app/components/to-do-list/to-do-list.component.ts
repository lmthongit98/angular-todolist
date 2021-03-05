import { Task } from './../../models/Task';
import { Component, OnInit } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  public TaskToDo: Task[] = [];
  public TaskDone: Task[] = [];

  constructor(private toDoListService: ToDoListService) { }

  ngOnInit(): void {
    this.getDataFromService();
  }

  onClickDone(id: number) {
    const index = this.toDoListService.taskList.findIndex(task => task.id == id);
    if (index != -1) {
      //update service
      this.toDoListService.taskList[index].isDone = true;
      //update component
      this.getDataFromService();
    }
  }

  onClickDelete(id: number){
    this.toDoListService.deleteTask(id);
    this.getDataFromService();
  }

  getDataFromService() {
    this.TaskToDo =  this.toDoListService.getTaskList().filter(item => !item.isDone)
    this.TaskDone =  this.toDoListService.getTaskList().filter(item => item.isDone)
  }

  onClickAdd(taskName:string){
    if(taskName.trim() != ''){
      this.toDoListService.addTask(new Task(
        this.toDoListService.generateID(), taskName, false
      ))
      this.getDataFromService();
      console.log( this.toDoListService.getTaskList())
    }
  }

}

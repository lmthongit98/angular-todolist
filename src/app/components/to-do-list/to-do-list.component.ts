import { Task } from './../../models/Task';
import { Component, OnInit } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  public taskName:string = '';

  public taskEdit:Task = new Task(-1, '', false);

  public TaskToDo: Task[] = [];
  public TaskDone: Task[] = [];

  public UpdateTaskState = false;

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



  onClickAdd(){
    if(this.taskName.trim() != ''){
      this.toDoListService.addTask(new Task(
        this.toDoListService.generateID(), this.taskName.trim(), false
      ))
      this.getDataFromService();
    }else{
      alert("Please fill the task name !")
    }
  }

  onClickEdit(task:Task){
    this.taskEdit = task;
    this.taskName = task.taskName;
    this.UpdateTaskState = true;
  }

  onClickUpdate(){
    this.taskEdit.taskName = this.taskName;
    this.toDoListService.updateTask(this.taskEdit);
    this.getDataFromService();
    this.UpdateTaskState = false;
    this.taskName = '';
  }


  getDataFromService() {
    this.TaskToDo =  this.toDoListService.getTaskList().filter(item => !item.isDone)
    this.TaskDone =  this.toDoListService.getTaskList().filter(item => item.isDone)
  }

}

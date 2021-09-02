import { TodoService } from './../services/todo.service';
import { Todo } from './../models/todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dois',
  templateUrl: './create-dois.component.html',
  styleUrls: ['./create-dois.component.css']
})
export class CreateDoisComponent implements OnInit {

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFInalizar: new Date(),
    finalizado: false

  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }

  create(): void {
    this.formataData()
    console.log(this.todo.dataParaFInalizar)
    this.service.createService(this.todo).subscribe((resp) => {
      this.service.message('To-do criado com sucesso!')
      this.router.navigate(['']);
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFInalizar)
    this.todo.dataParaFInalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear}`
  }

}

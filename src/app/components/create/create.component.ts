import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router, private servie: TodoService) { }

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFInalizar: new Date(),
    finalizado: false
  }

  ngOnInit(): void {
  }

  create(): void {
    this.formataData()
    this.servie.createService(this.todo).subscribe((resposta) => {
      this.servie.message('Todo criado com sucesso!');
      this.router.navigate([''])
    }, err => {
      this.servie.message('Falha ao criar o todo!');
      this.router.navigate([''])
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }
  
  formataData(): void {
    let data = new Date(this.todo.dataParaFInalizar)
    this.todo.dataParaFInalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}

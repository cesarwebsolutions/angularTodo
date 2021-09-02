import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();

  }

  findAll(): void {
    this.service.findAllService().subscribe((resposta) => {
      resposta.forEach(todo => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
        }
      })
    })
  }

  voltar(): void {
    this.router.navigate(['']);
  }

}

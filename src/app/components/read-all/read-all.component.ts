import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;

  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
    
  }

  findAll(): void {
    this.service.findAllService().subscribe((resp) => {
      // this.list = resp;
      resp.forEach(todo => {
        if(todo.finalizado) {
          this.listFinished.push(todo);
        } else {
          this.list.push(todo);
        }
      })
      this.closed = this.listFinished.length
    })
  }


  finalizar(item: Todo): void {
    item.finalizado = true;
    this.service.finalizarService(item).subscribe((resposta) => {
      this.service.message('Task finalizada com sucesso!');
      this.list = this.list.filter(todo => todo.id !== item.id);
      this.closed++;
    })
  }

  delete(id: any):void {
    this.service.deleteService(id).subscribe((resposta) => {
        this.service.message('Task deletado com sucesso!');
        this.list = this.list.filter(todo => todo.id !== id);
  
    })
  }

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados'])
  }
  

}

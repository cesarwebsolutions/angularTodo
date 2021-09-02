import { Todo } from './../../models/todo';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private router: Router, 
    private servie: TodoService,
    private activatedRoute: ActivatedRoute  
  ) { }

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFInalizar: new Date(),
    finalizado: false
  }

  ngOnInit(): void {
    this.todo.id = this.activatedRoute.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.servie.findByIdService(this.todo.id).subscribe((resposta) => {
      this.todo = resposta;
    })
  }

  update():void {
    this.servie.updateService(this.todo).subscribe((resposta) => {
      this.servie.message("Atualizado com sucesso");
      this.router.navigate(['']);
    }, error => {
      this.servie.message("Falha ao atualizar");
      this.router.navigate(['']);
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

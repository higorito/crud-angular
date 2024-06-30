import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Observable<Course[]>;

  displayedColumns = ['name', 'category'];

  // coursesService: CoursesService; //injecao inves de instanciar o serviço aqui

  constructor(private coursesService: CoursesService) {
    //   this.courses = [];
    // this.coursesService = new CoursesService(); //inves de instanciar o serviço aqui, vamos fazer a injeção de dependencia
    this.courses = this.coursesService.list();

    // this.coursesService.list().subscribe(courses => console.log(courses)); //se ela continussse retornando um array de courses, poderiamos fazer isso
    //mas ai resolve com o pipe async no html, melhor sempre usar o normal inves de subscribe
  }

  ngOnInit(): void {

  }

}

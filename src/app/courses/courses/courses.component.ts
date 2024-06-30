import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];

  displayedColumns = ['name', 'category'];

  // coursesService: CoursesService; //injecao inves de instanciar o serviço aqui

  constructor(private coursesService: CoursesService) {
    //   this.courses = [];
    // this.coursesService = new CoursesService(); //inves de instanciar o serviço aqui, vamos fazer a injeção de dependencia
    // this.courses = this.coursesService.list(); //pode ser aqui ou no ngOnInit
  }

  ngOnInit(): void {
    this.courses = this.coursesService.list();
  }

}

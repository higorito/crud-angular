import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses: Course[] = [
    { _id: '1', name: 'Angular', category: 'Frontend' },
    { _id: '2', name: 'React', category: 'Frontend' },
    { _id: '3', name: 'Spring Boot', category: 'Backend' }
  ];

  displayedColumns = ['name', 'category'];

  constructor() {
    //   this.courses = [];
  }

}

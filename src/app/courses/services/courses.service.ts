import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  //so de colocar no construtor o angular ja entende que é para injetar o serviço
  constructor(private httpClient: HttpClient) {

  }

  list(): Course[] {
    return [
      { _id: '1', name: 'Angular', category: 'Frontend' },
      { _id: '2', name: 'React', category: 'Frontend' },
      { _id: '3', name: 'Spring Boot', category: 'Backend' }
    ];
  }
}

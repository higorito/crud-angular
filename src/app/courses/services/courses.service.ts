import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  //so de colocar no construtor o angular ja entende que é para injetar o serviço
  constructor(private httpClient: HttpClient) {

  }

  list() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(), //pega o valor e cancela a inscrição, se nao for stream pode usar isso ou o take(1)
        delay(2000),
        tap(courses => console.log(courses))
      );
  }
}

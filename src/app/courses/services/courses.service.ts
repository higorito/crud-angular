import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  //so de colocar no construtor o angular ja entende que é para injetar o serviço
  constructor(private httpClient: HttpClient) {

  }

  list() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(), //pega o valor e cancela a inscrição, se nao for stream pode usar isso ou o take(1)
        tap(courses => console.log(courses))
      );
  }

  save(record: Partial<Course>) { //partial é para dizer que é um objeto parcial, nao precisa ter todos os campos
    //retorna um observable
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}

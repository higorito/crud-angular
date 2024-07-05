import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, take, tap } from 'rxjs';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  //so de colocar no construtor o angular ja entende que é para injetar o serviço
  constructor(private httpClient: HttpClient) {

  }

  list(page = 0, pageSize = 10) {
    return this.httpClient.get<CoursePage>(this.API, { params: { page: page, pageSize: pageSize } })
      .pipe(
        first(), //pega o valor e cancela a inscrição, se nao for stream pode usar isso ou o take(1)
        tap(courses => console.log(courses))
      );
  }



  save(record: Partial<Course>) { //partial é para dizer que é um objeto parcial, nao precisa ter todos os campos
    if (record._id) { //se tiver id é para atualizar
      return this.update(record);
    }//se nao tiver id é para criar pq ele é gerado la no backend
    return this.create(record);
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`).pipe(first());
  }

}

import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  displayedColumns = ['name', 'category', 'actions'];

  // coursesService: CoursesService; //injecao inves de instanciar o serviço aqui

  constructor(private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //   this.courses = [];
    // this.coursesService = new CoursesService(); //inves de instanciar o serviço aqui, vamos fazer a injeção de dependencia
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Não foi possível carregar os cursos');
        return of([]);
      })
    );

    // this.coursesService.list().subscribe(courses => console.log(courses)); //se ela continussse retornando um array de courses, poderiamos fazer isso
    //mas ai resolve com o pipe async no html, melhor sempre usar o normal inves de subscribe
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });  //pega a rota atual e adiciona a rota new, vem do ActivatedRoute
  }

}

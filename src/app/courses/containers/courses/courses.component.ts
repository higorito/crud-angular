
import { Component, OnInit } from '@angular/core';

import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;

  // coursesService: CoursesService; //injecao inves de instanciar o serviço aqui

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    //   this.courses = [];
    // this.coursesService = new CoursesService(); //inves de instanciar o serviço aqui, vamos fazer a injeção de dependencia
    // this.courses$ = this.coursesService.list().pipe(
    //   catchError(error => {
    //     this.onError('Não foi possível carregar os cursos');
    //     return of([]);
    //   })
    // );

    // this.coursesService.list().subscribe(courses => console.log(courses)); //se ela continussse retornando um array de courses, poderiamos fazer isso
    //mas ai resolve com o pipe async no html, melhor sempre usar o normal inves de subscribe

    //------------p n repetir o codigo aproveita o refresh
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Não foi possível carregar os cursos');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });  //pega a rota atual e adiciona a rota new, vem do ActivatedRoute
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onDelete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Deseja realmente remover o curso ${course.name}?`,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe( //sem o subscribe nao vai fazer a requisição
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 2000,
              verticalPosition: 'top', horizontalPosition: 'center'
            },);
          },
          error => {
            this.onError('Não foi possível remover o curso');
          }

        );
      }
    });


  }

}

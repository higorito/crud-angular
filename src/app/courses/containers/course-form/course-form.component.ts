import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''], //campo oculto
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];  //mesmo objeto que foi passado no resolver
    this.form.patchValue(course);
  }


  onSubmit() {
    this.service.save(this.form.value).subscribe(success => this.showSuccess('Curso salvo com sucesso!'),
      error => this.showError('Erro ao salvar curso!')
    );
  }

  onCancel() {
    this.location.back();
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
    this.onCancel();
  }

  private showError(message: string) {
    this.snackBar.open(message, 'OK', { duration: 2000 });
  }

}

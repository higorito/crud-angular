import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    category: ['', [Validators.required]],
  });
  categories: string[] = ['Frontend', 'Backend', 'Mobile'];

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

    console.log(course.lessons);
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


  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      return `Deve ter no mínimo ${field.getError('minlength').requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      return `Deve ter no máximo ${field.getError('maxlength').requiredLength} caracteres`;
    }

    return 'inválido';

  }
}

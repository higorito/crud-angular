import { Location } from '@angular/common';
import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private FormBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
    this.form = this.FormBuilder.group({
      name: [null],
      category: [null],
    });
  }

  submitForm() {
    console.log('Form submitted');
  }

  ngOnInit() {

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

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    // name: new FormControl<string>(''),   // name: new FormControl<string | null>(null),
    // name: new FormControl('', { nonNullable: true }),
    name: [''],
    category: [''],
  });

  constructor(private formBuilder: NonNullableFormBuilder,   //mesma coisa que o FormBuilder so q n permite null, igual ali em cima no name
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
    // this.form daqui foi la pra cima, aproveitar a tipagem do FormBuilder
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

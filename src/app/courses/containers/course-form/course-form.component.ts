import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  categories: string[] = ['Frontend', 'Backend', 'Mobile'];
  /*
    form = this.formBuilder.group({
      _id: [''], //campo oculto
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      category: ['', [Validators.required]],
    });
  */

  form!: FormGroup; //! para dizer que não é nulo q vai ser inicializado no ngOnInit

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
    // this.form.patchValue(course);

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.createLessonFormArray(course))
    });

    console.log(this.form);
    console.log(this.form.value);
    console.log(this.form.get('lessons'));
  }

  private createLessonFormArray(course: Course) {
    const lessons = []
    //tratar quando tem lesson e quando não tem
    if (course?.lessons) {
      //se existir itera sobre as lessons e cria um formGroup para cada uma
      course.lessons.forEach(lesson => { lessons.push(this.createLesson(lesson)) });
    } else {
      //se não tiver lesson, criar um array vazio
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    });
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

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  categories: string[] = ['Frontend', 'Backend', 'Mobile'];

  form!: FormGroup; //! para dizer que não é nulo q vai ser inicializado no ngOnInit

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService //publico para poder acessar no html
  ) {

  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];  //mesmo objeto que foi passado no resolver

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.createLessonFormArray(course), Validators.required)
    });
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
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(11), Validators.maxLength(20)]],
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;//pega o form e dps os controles
    //vai passar la no html e vai fazer um loop interando sobre cada um dos controles
  }

  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson()); //ja criou um novo formGroup vazio
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(success => this.showSuccess('Curso salvo com sucesso!'),
        error => this.showError('Erro ao salvar curso!')
      );
    } else {
      this.formUtils.validateAllFormFields(this.form); //valida todos os campos do form
    }
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

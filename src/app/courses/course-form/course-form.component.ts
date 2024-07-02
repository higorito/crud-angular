import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(private FormBuilder: FormBuilder) {
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
  }

  onCancel() { }

}

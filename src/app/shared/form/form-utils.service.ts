import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => { //pega todos os campos do formGroup
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });  //p marca como tocado ele, e não os filhos pq se tiver obserservando o formGroup, ele vai disparar o evento de toque para os filhos
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        this.validateAllFormFields(control); //recursivo para pegar os filhos até chegar no campo untypedFormControl
      }
    });
  }


  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {  //pega diretamente o erro do campo, ai pode utilizar tanto em formGroup quanto em formArray

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


  getFormArrayErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormGroup;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;

    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }



}

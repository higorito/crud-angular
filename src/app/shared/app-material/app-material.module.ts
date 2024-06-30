import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';


//aqui vai servir so para criar um modulo compartilhado que exporta os modulos do material
//mais facil do que ficar importando em todos os modulos aquele monte de modulos do material
@NgModule({
  exports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class AppMaterialModule { }

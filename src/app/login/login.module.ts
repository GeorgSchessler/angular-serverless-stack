import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MdFormFieldModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    MdFormFieldModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

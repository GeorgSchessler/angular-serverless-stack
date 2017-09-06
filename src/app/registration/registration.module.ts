import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { MdFormFieldModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    MdFormFieldModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { MdFormFieldModule, MdInputModule, MdButtonModule, MdCardModule } from '@angular/material';
import { CongnitoService } from '../congnito.service';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdInputModule,
        MdFormFieldModule,
        MdCardModule
    ],
    declarations: [
        RegistrationComponent
    ],
    providers: [
        CongnitoService
    ]
})
export class RegistrationModule { }

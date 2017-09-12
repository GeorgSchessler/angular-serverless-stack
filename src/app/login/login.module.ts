import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
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
        LoginComponent
    ],
    providers: [
        CongnitoService
    ]
})
export class LoginModule { }

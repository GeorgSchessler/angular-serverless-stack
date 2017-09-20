import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MdButtonModule, MdInputModule, MdFormFieldModule, MdCardModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdInputModule,
        MdFormFieldModule,
        MdCardModule
    ],
    declarations: [UserComponent]
})
export class UserModule { }

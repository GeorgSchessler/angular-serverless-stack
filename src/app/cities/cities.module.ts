import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from './cities.component';
import { MdButtonModule, MdCardModule } from '@angular/material';
import { CongnitoService } from '../congnito.service';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdCardModule
    ],
    declarations: [
        CitiesComponent
    ],
    providers: [
        CongnitoService
    ]
})
export class CitiesModule { }

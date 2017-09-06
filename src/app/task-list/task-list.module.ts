import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskListComponent } from './task-list.component';
import { MdButtonModule, MdTabsModule, MdInputModule, MdFormFieldModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdTabsModule,
        MdInputModule,
        MdFormFieldModule
    ],
    declarations: [
        TaskListComponent,
        TaskComponent
    ]
})
export class TaskListModule { }

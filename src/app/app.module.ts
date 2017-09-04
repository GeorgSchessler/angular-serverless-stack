import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdTabsModule, MdInputModule, MdFormFieldModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { taskReducer } from './task-list/task-list.reducer';
import { TaskComponent } from './task/task.component';
import { environment } from '../environments/environment';

export function logger(reducer): any {
    // default, no options
    return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
    declarations: [
        AppComponent,
        TaskListComponent,
        TaskComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdButtonModule,
        MdCheckboxModule,
        MdTabsModule,
        MdInputModule,
        MdFormFieldModule,
        StoreModule.forRoot({ tasks: taskReducer }, {metaReducers})
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

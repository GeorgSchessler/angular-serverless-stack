import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdTabsModule, MdInputModule, MdFormFieldModule, MdToolbarModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { taskReducer } from './task-list/task-list.reducer';
import { TaskComponent } from './task/task.component';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { RegistrationModule } from './registration/registration.module';
import { registrationkReducer } from './registration/registration.reducer';
import { appRoutes } from './app.routes';
import { TaskListModule } from './task-list/task-list.module';

export function logger(reducer): any {
    return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdToolbarModule,
        TaskListModule,
        RegistrationModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({ tasks: taskReducer, registration: registrationkReducer }, { metaReducers })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

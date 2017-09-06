import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { TaskListComponent } from './task-list/task-list.component';

export const appRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: '', component: TaskListComponent }
];

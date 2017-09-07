import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';

export const appRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cities', component: CitiesComponent },
    { path: '', component: TaskListComponent }
];

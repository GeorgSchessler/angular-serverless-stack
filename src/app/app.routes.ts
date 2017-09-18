import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { EventsComponent } from './events/events.component';
import { UserComponent } from './user/user.component';

export const appRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'cities', component: CitiesComponent },
    { path: 'events/:city', component: EventsComponent },
    { path: '', component: CitiesComponent }
];

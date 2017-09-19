import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { EventsComponent } from './events/events.component';
import { UserComponent } from './user/user.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'cities', component: CitiesComponent },
    { path: 'events/:city', component: EventsComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', component: HomeComponent }
];

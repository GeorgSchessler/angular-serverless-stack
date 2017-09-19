import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdToolbarModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { RegistrationModule } from './registration/registration.module';
import { registrationReducer } from './registration/registration.reducer';
import { appRoutes } from './app.routes';
import { LoginModule } from './login/login.module';
import { loginReducer } from './login/login.reducer';
import { CitiesModule } from './cities/cities.module';
import { EventsModule } from './events/events.module';
import { CongnitoService } from './congnito.service';
import { EventsService } from './events/events.service';
import { eventsReducer } from './events/events.reducer';
import { UserModule } from './user/user.module';
import { userReducer } from './user/user.reducer';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

export function logger(reducer): any {
    return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
    declarations: [
        AppComponent,
        ContactComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdButtonModule,
        MdToolbarModule,
        RegistrationModule,
        UserModule,
        CitiesModule,
        EventsModule,
        LoginModule,
        RouterModule.forRoot(appRoutes),
        StoreModule.forRoot({
            registration: registrationReducer, login: loginReducer, events: eventsReducer, user: userReducer
        }, { metaReducers })
    ],
    providers: [
        CongnitoService,
        EventsService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

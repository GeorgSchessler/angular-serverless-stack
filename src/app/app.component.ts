import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Login } from './app.state';
import { LOGOUT } from './login/login.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent {
    model: Observable<Login>;

    constructor(private store: Store<AppState>, private router: Router) {
        this.model = store.select('login');
    }

    logout() {
        this.model.subscribe(login => {
            console.log(login);
            login.user.signOut();
            this.store.dispatch({ type: LOGOUT });
        });
    }
}

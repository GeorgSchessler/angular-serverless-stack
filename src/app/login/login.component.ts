import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Login, AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { MODIFY } from './login.actions';
import { CongnitoService } from '../congnito.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl']
})
export class LoginComponent {

    model: Observable<Login>;

    constructor(private store: Store<AppState>, private congnitoService: CongnitoService) {
        this.model = store.select('login');
    }

    modify(field, value) {
        this.store.dispatch({ type: MODIFY, model: { [field]: value } });
    }

    login() {
        this.congnitoService.login();
    }

}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Registration, AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { MODIFY } from './registration.actions';
import { CongnitoService } from '../congnito.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.styl']
})
export class RegistrationComponent {

    model: Observable<Registration>;

    constructor(private store: Store<AppState>, private congnitoService: CongnitoService) {
        this.model = store.select('registration');
    }

    modify(field, value) {
        this.store.dispatch({ type: MODIFY, model: {[field]: value} });
    }

    register() {
        this.congnitoService.register();
    }

    confirm() {
        this.congnitoService.confirm();
    }
}

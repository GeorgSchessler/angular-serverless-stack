import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { CongnitoService } from '../congnito.service';
import { MODIFY } from '../user/user.actions';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.styl']
})
export class UserComponent {

    model: Observable<User>;

    constructor(private store: Store<AppState>, private congnitoService: CongnitoService) {
        this.model = store.select('user');
    }

    modify(field, value) {
        this.store.dispatch({ type: MODIFY, model: { [field]: value } });
    }

    change() {
        this.model.subscribe(user => {
            this.congnitoService.setAttribute('name', user.firstName);
            this.congnitoService.setAttribute('family_name', user.lastName);
        }).unsubscribe();
    }
}

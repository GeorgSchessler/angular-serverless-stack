import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CongnitoService } from '../congnito.service';
import { Events, AppState, Login, User } from '../app.state';
import { Observable } from 'rxjs/Observable';
import { MODIFY, ADDLOCAL, REMOVELOCAL } from '../user/user.actions';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/skip';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.styl']
})
export class CitiesComponent {

    public cities = ['Berlin', 'Frankfurt', 'Hamburg', 'München', 'Stuttgart'];

    model: Observable<Events>;
    user: Observable<User>;

    constructor(private store: Store<AppState>, private router: Router, private congnitoService: CongnitoService) {
        this.model = store.select('events');
        this.user = store.select('user');
        const defaultCity = window.localStorage.getItem('defaultCity');
        if (!window.location.href.endsWith('cities') && defaultCity) {
            this.route(defaultCity);
        }
    }

    route(city) {
        this.router.navigate(['/events/' + city]);
    }

    addLocal(city) {
        this.user.skip(1).subscribe(user => this.congnitoService.setAttribute('locale', user.locale.toString()));
        this.store.dispatch({ type: ADDLOCAL, city: city });
        this.route(city);
        /* this.user.first().subscribe(user => {
            if (!user.user) { return ''; }

            user.locale.push(city);

            this.store.dispatch({ type: MODIFY, model: { ['locale']: user.locale } });
            this.congnitoService.setAttribute('locale', user.locale.toString());
            this.route(city);
        }).unsubscribe(); */
    }

    removeLocal(city) {
        this.user.skip(1).subscribe(user => this.congnitoService.setAttribute('locale', user.locale.toString()));
        this.store.dispatch({ type: REMOVELOCAL, city: city });
        /* this.user.first().subscribe(user => {
            user.locale = user.locale.filter(value => value !== city);

            this.store.dispatch({ type: MODIFY, model: { ['locale']: user.locale } });
            this.congnitoService.setAttribute('locale', user.locale.toString());
        }).unsubscribe();*/
    }
}

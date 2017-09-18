import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CongnitoService } from '../congnito.service';
import { Events, AppState, Login } from '../app.state';
import { Observable } from 'rxjs/Observable';
import { MODIFY } from '../events/events.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.styl']
})
export class CitiesComponent {

    public cities = ['Berlin', 'Frankfurt', 'Hamburg', 'München', 'Stuttgart'];

    model: Observable<Events>;
    login: Observable<Login>;

    constructor(private store: Store<AppState>, private router: Router, private congnitoService: CongnitoService) {
        this.model = store.select('events');
        this.login = store.select('login');
        const defaultCity = window.localStorage.getItem('defaultCity');
        if (!window.location.href.endsWith('cities') && defaultCity) this.route(defaultCity);
    }

    route(city) {
        this.router.navigate(['/events/' + city]);
    }

    favorite(city) {
        window.localStorage.setItem('defaultCity', city);
        this.congnitoService.getAttribute('locale');
        this.congnitoService.setAttribute('locale', city);
        this.route(city);
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.styl']
})
export class CitiesComponent {

    public cities = ['Berlin', 'Frankfurt', 'Hamburg', 'München', 'Stuttgart'];

    constructor(private router: Router) {
        const location = window.location.href.endsWith('cities');
        const defaultCity = window.localStorage.getItem('defaultCity');
        if (!location && defaultCity) this.route(defaultCity);
    }

    route(city) {
        this.router.navigate(['/events/' + city]);
    }

    setDefault(city) {
        window.localStorage.setItem('defaultCity', city);
        this.route(city);
    }

}

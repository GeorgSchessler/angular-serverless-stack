import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CongnitoService } from '../congnito.service';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.styl']
})
export class CitiesComponent {

    public cities = ['Berlin', 'Frankfurt', 'Hamburg', 'München', 'Stuttgart'];

    constructor(private router: Router, private congnitoService: CongnitoService) {
        const defaultCity = window.localStorage.getItem('defaultCity');
        if (!window.location.href.endsWith('cities') && defaultCity) this.route(defaultCity);
    }

    route(city) {
        this.router.navigate(['/events/' + city]);
    }

    setDefault(city) {
        window.localStorage.setItem('defaultCity', city);
        this.route(city);
    }

}

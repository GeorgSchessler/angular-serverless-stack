import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.styl']
})
export class CitiesComponent {

    public cities = ['Berlin', 'Frankfurt', 'Hamburg', 'München', 'Stuttgart'];

    constructor(private router: Router) { }

    route() {
        this.router.navigate(['/events']);
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.styl']
})
export class CitiesComponent {

  constructor(private router: Router) { }

  route() {
    this.router.navigate(['/events']);
}

}

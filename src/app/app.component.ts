import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Login } from './app.state';
import { LOGOUT } from './login/login.actions';
import { NavigationEnd, Router } from '@angular/router';
import { CongnitoService } from './congnito.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
    model: Observable<Login>;

    constructor(private store: Store<AppState>, private router: Router, private congnitoService: CongnitoService) {
        this.model = store.select('login');

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) window.scrollTo(0, 0);
        });
    }

    ngOnInit() {
        if (window.location.pathname) this.router.navigate([window.location.pathname]);
    }

    logout() {
        this.congnitoService.logout();
    }
}

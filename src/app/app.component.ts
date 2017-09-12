import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Login } from './app.state';
import { LOGOUT, LOGIN } from './login/login.actions';
import { NavigationEnd, Router } from '@angular/router';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
    model: Observable<Login>;

    constructor(private store: Store<AppState>, private router: Router) {
        this.model = store.select('login');

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });

        this.model.subscribe(login => {
            if (!login.user) {

                const poolData = {
                    UserPoolId: 'eu-west-1_f3NzDdtTt', // Your user pool id here
                    ClientId: '3uib4sjo297okfdd6gvld257qu' // Your client id here
                };
                const userPool = new CognitoUserPool(poolData);
                const cognitoUser = userPool.getCurrentUser();

                if (cognitoUser != null) {
                    cognitoUser.getSession(function (err, session) {
                        if (err) {
                            alert(err);
                            return;
                        }
                        console.log('session validity: ' + session.isValid());
                        store.dispatch({ type: LOGIN, user: cognitoUser });

                        // NOTE: getSession must be called to authenticate user before calling getUserAttributes
                        cognitoUser.getUserAttributes(function (error, attributes) {
                            if (error) {
                                // Handle error
                            } else {
                                console.log(attributes);
                                // Do something with attributes
                            }
                        });
                    });
                }
            }
        });
    }


    ngOnInit() {
        if (window.location.pathname) this.router.navigate([window.location.pathname]);
    }

    logout() {
        this.model.subscribe(login => {
            console.log(login);
            login.user.signOut();
            this.store.dispatch({ type: LOGOUT });
        }).unsubscribe();
    }
}

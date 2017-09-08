import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Login, AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { MODIFY, LOGIN } from './login.actions';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl']
})
export class LoginComponent {

    model: Observable<Login>;
    userPool: CognitoUserPool;

    constructor(private store: Store<AppState>, private router: Router) {
        this.model = store.select('login');

        const poolData = {
            UserPoolId: 'eu-west-1_f3NzDdtTt', // Your user pool id here
            ClientId: '3uib4sjo297okfdd6gvld257qu' // Your client id here
        };
        this.userPool = new CognitoUserPool(poolData);
    }

    modify(field, value) {
        this.store.dispatch({ type: MODIFY, model: {[field]: value} });
    }

    login() {
        this.model.subscribe((login: Login) => {
            this.loginAws(login.email, login.password);
        }).unsubscribe();
    }

    loginAws(email, password) {
        const authenticationData = {
            Username: email,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: email,
            Pool: this.userPool
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: result => {
                this.store.dispatch({ type: LOGIN, user: cognitoUser });
                this.router.navigate(['/']);
            },
            onFailure: err => alert(err)
        });
    }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Login, AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { MODIFY } from './login.actions';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.styl']
})
export class LoginComponent {

    model: Observable<Login>;
    userPool: CognitoUserPool;

    constructor(private store: Store<AppState>) {
        this.model = store.select('login');

        const poolData = {
            UserPoolId: 'eu-west-1_f3NzDdtTt', // Your user pool id here
            ClientId: '3uib4sjo297okfdd6gvld257qu' // Your client id here
        };
        this.userPool = new CognitoUserPool(poolData);
    }

    modify(field, value) {
        this.model[field] = value;
        this.store.dispatch({ type: MODIFY, login: this.model });
    }

    login() {
        this.model.subscribe((login: Login) => {
            this.loginAws(login.email, login.password);
        });
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
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
            },

            onFailure: function (err) {
                alert(err);
            },
        });
    }

}

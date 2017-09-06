import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Registration, AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { MODIFY, DELETE } from './registration.actions';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.styl']
})
export class RegistrationComponent {

    registration: Observable<Registration>;
    userPool: CognitoUserPool;

    constructor(private store: Store<AppState>) {
        this.registration = store.select('registration');

        const poolData = {
            UserPoolId: 'eu-west-1_f3NzDdtTt', // Your user pool id here
            ClientId: '3uib4sjo297okfdd6gvld257qu' // Your client id here
        };
        this.userPool = new CognitoUserPool(poolData);
    }

    modify(field, value) {
        this.registration[field] = value;
        this.store.dispatch({ type: MODIFY, registration: this.registration });
    }

    register() {
        this.registration.subscribe((user: Registration) => {
            if (user.password === user.passwordRepeat) {
                this.registerAws(user.email, user.password);
            }
        });
    }

    confirm() {
        this.registration.subscribe((user: Registration) => {
            this.confirmAws(user.email, user.code);
        });
    }

    registerAws(email, password) {
        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: email
        };

        const attributeEmail = new CognitoUserAttribute(dataEmail);

        attributeList.push(attributeEmail);

        this.userPool.signUp(email, password, attributeList, null, function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            const cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            this.store.dispatch({ type: DELETE });
        });
    }

    confirmAws(email, code) {
        const userData = {
            Username: email,
            Pool: this.userPool
        };

        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }
}

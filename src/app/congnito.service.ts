import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, Login, Registration } from './app.state';
import { LOGIN, LOGOUT } from './login/login.actions';
import { DELETE } from './registration/registration.actions';

@Injectable()
export class CongnitoService {

    userPool: CognitoUserPool;
    user: CognitoUser;

    constructor(private store: Store<AppState>, private router: Router) {
        const poolData = {
            UserPoolId: 'yourValue', // Your user pool id here
            ClientId: 'yourValue' // Your client id here
        };

        this.userPool = new CognitoUserPool(poolData);
        this.user = this.userPool.getCurrentUser();

        this.autologin();
    }

    login() {
        this.store.select('login').subscribe((login: Login) => {
            const authenticationData = {
                Username: login.email,
                Password: login.password,
            };
            const authenticationDetails = new AuthenticationDetails(authenticationData);

            const userData = {
                Username: login.email,
                Pool: this.userPool
            };
            this.user = new CognitoUser(userData);
            this.user.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    this.store.dispatch({ type: LOGIN, user: this.user });
                    this.router.navigate(['/']);
                },
                onFailure: err => alert(err)
            });
        }).unsubscribe();
    }

    autologin() {
        if (this.user !== null) {
            this.user.getSession((err, session) => {
                if (err) {
                    alert(err);
                    return;
                }
                this.store.dispatch({ type: LOGIN, user: this.user });
            });
        }
    }

    register() {
        this.store.select('registration').subscribe((registration: Registration) => {
            console.log(registration);
            if (registration.password === registration.passwordRepeat) {
                const attributeList = [];

                const dataEmail = {
                    Name: 'email',
                    Value: registration.email
                };

                const attributeEmail = new CognitoUserAttribute(dataEmail);

                attributeList.push(attributeEmail);

                this.userPool.signUp(registration.email, registration.password, attributeList, null, (err, result) => {
                    if (err) {
                        alert(err);
                        return;
                    }
                    alert('Your account is created. Please check your mails for the confirmation code.');
                    this.user = result.user;
                    this.store.dispatch({ type: DELETE });
                });
            }
        }).unsubscribe();
    }

    confirm() {
        this.store.select('registration').subscribe((registration: Registration) => {
            const userData = {
                Username: registration.email,
                Pool: this.userPool
            };

            this.user = new CognitoUser(userData);
            this.user.confirmRegistration(registration.code, true, (err, result) => {
                if (err) {
                    alert(err);
                    return;
                }
                alert('Your account is confirmed');
                this.router.navigate(['/login']);
            });
        }).unsubscribe();
    }

    logout() {
        this.user.signOut();
        this.store.dispatch({ type: LOGOUT });
    }

    // TODO: Implement a selector and return the value
    private getAttribute(attribute) {
        this.user.getUserAttributes(function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log(result);
        });
    }

    // TODO: Permission is not given by amazon
    private setAttribute(attribute, value) {
        const attributeList = [];
        const newAttribute = new CognitoUserAttribute({
            Name: attribute,
            Value: value
        });
        attributeList.push(newAttribute);

        this.user.updateAttributes(attributeList, function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }
}

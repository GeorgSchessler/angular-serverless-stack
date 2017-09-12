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
            UserPoolId: 'eu-west-1_f3NzDdtTt', // Your user pool id here
            ClientId: '3uib4sjo297okfdd6gvld257qu' // Your client id here
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

                console.log('Register with ', registration.password);
                this.userPool.signUp(registration.email, registration.password, attributeList, null, (err, result) => {
                    if (err) {
                        alert(err);
                        return;
                    }
                    this.user = result.user;
                    console.log('user name is ' + this.user.getUsername());
                    this.store.dispatch({ type: DELETE });
                });
            }
        });
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
                console.log('call result: ' + result);
            });
        });
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

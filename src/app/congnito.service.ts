import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, Login, Registration } from './app.state';
import { MODIFY } from './user/user.actions';
import { DELETE as RegistrationDELETE } from './registration/registration.actions';
import { DELETE as LoginDELETE } from './login/login.actions';
const packageConfig = require('../../package.json');

@Injectable()
export class CongnitoService {

    userPool: CognitoUserPool;
    user: CognitoUser;

    constructor(private store: Store<AppState>, private router: Router) {
        const poolData = {
            UserPoolId: packageConfig.config.poolid,
            ClientId: packageConfig.config.clientid
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
                    this.store.dispatch({ type: MODIFY, model: { ['user']: this.user } });
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
                this.store.dispatch({ type: MODIFY, model: { ['user']: this.user } });
            });
        }
    }

    register() {
        this.store.select('registration').subscribe((registration: Registration) => {
            if (registration.password === registration.passwordRepeat) {
                const attributeList = [];

                attributeList.push(
                    userAttribute('email', registration.email),
                    userAttribute('name', registration.firstName),
                    userAttribute('family_name', registration.lastName),
                    userAttribute('locale', '')
                );

                this.userPool.signUp(registration.email, registration.password, attributeList, null, (err, result) => {
                    if (err) {
                        alert(err);
                        return;
                    }
                    alert('Your account is created. Please check your mails for the confirmation code.');
                    this.user = result.user;
                    this.store.dispatch({ type: RegistrationDELETE });
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
        this.store.dispatch({ type: LoginDELETE });
        this.store.dispatch({ type: MODIFY, model: { ['user']: undefined} });
    }

    getAttribute(name) {
        this.user.getUserAttributes((err, result) => {
            if (err) {
                alert(err);
                return;
            }
            const attribute = result.filter((attributeObject: CognitoUserAttribute) => attributeObject.getName() === name);
            return attribute[0] ? attribute[0].getValue() : '';
        });
    }

    setAttribute(attribute, value) {
        const attributeList = [];

        attributeList.push(userAttribute(attribute, value));

        this.user.updateAttributes(attributeList, function (err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
    }
}

function userAttribute(attribute, value) {
    const data = {
        Name: attribute,
        Value: value
    };

    return new CognitoUserAttribute(data);
}

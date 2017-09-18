import { CognitoUser } from 'amazon-cognito-identity-js';
export interface AppState {
    registration: Registration;
    login: Login;
    events: Events;
    user: User;
}

export interface Registration {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordRepeat: string;
    code: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface Events {
    textFilter: string;
    cityFilter: string;
    categoryFilter: string;
}

export interface User {
    user: CognitoUser;
    email: string;
    firstName: string;
    lastName: string;
    locale: string;
}

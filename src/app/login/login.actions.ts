import { Action } from '@ngrx/store';
import { CognitoUser } from 'amazon-cognito-identity-js';

export const MODIFY = '[LOGIN] Modify';
export const DELETE = '[LOGIN] Delete';
export const LOGIN = '[LOGIN] LOGIN';
export const LOGOUT = '[LOGIN] LOGOUT';

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public model: Object) { }
}

export class Delete implements Action {
    readonly type = DELETE;
}

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public user: CognitoUser) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type All
    = Modify
    | Delete
    | Login
    | Logout;

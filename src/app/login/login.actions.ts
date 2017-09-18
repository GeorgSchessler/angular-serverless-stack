import { Action } from '@ngrx/store';
import { CognitoUser } from 'amazon-cognito-identity-js';

export const MODIFY = '[LOGIN] Modify';
export const DELETE = '[LOGIN] Delete';

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public model: Object) { }
}

export class Delete implements Action {
    readonly type = DELETE;
}

export type All
    = Modify |
    Delete;

import { Action } from '@ngrx/store';

export const MODIFY = '[LOGIN] Modify';
export const DELETE = '[LOGIN] Delete';

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public login: Object) { }
}

export class Delete implements Action {
    readonly type = DELETE;
}

export type All
    = Modify
    | Delete;

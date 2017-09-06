import { Action } from '@ngrx/store';

export const MODIFY = '[REGISTRATION] Modify';
export const DELETE = '[REGISTRATION] Delete';

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public registration: Object) { }
}

export class Delete implements Action {
    readonly type = DELETE;
}

export type All
    = Modify
    | Delete;

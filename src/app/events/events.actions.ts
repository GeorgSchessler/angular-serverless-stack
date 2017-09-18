import { Action } from '@ngrx/store';

export const MODIFY = '[EVENTS] Modify';
export const DELETE = '[EVENTS] DELETE';

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public model: Object) { }
}

export class Delete implements Action {
    readonly type = DELETE;
}

export type All
    = Modify
    | Delete;

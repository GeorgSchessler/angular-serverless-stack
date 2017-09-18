import { Action } from '@ngrx/store';

export const MODIFY = '[USER] Modify';
export const ADDLOCAL = '[USER] AddLocal';
export const REMOVELOCAL = '[USER] RemoveLocal';
export const DELETE = '[USER] Delete';

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public model: Object) { }
}

export class AddLocal implements Action {
    readonly type = ADDLOCAL;

    constructor(public city: string) { }
}

export class RemoveLocal implements Action {
    readonly type = REMOVELOCAL;

    constructor(public city: string) { }
}

export class Delete implements Action {
    readonly type = DELETE;

    constructor(public model: Object) { }
}

export type All
    = Modify |
    AddLocal |
    RemoveLocal |
    Delete;

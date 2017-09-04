import { Action } from '@ngrx/store';

export const ADD = '[TASK-LIST] Add';
export const MODIFY = '[TASK-LIST] Modify';
export const DELETE = '[TASK-LIST] Delete';

export class Add implements Action {
    readonly type = ADD;
}

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public index: number, public task: Object) { }
}

export class Delete implements Action {
    readonly type = DELETE;

    constructor(public index: number) { }
}

export type All
    = Add
    | Modify
    | Delete;

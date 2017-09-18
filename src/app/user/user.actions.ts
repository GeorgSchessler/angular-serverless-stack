import { Action } from '@ngrx/store';

export const MODIFY = '[USER] Modify';

export class Modify implements Action {
    readonly type = MODIFY;

    constructor(public model: Object) { }
}

export type All
    = Modify;

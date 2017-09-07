import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ADD, MODIFY, DELETE } from '../task-list/task-list.actions';
import { Task, AppState } from '../app.state';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.styl']
})
export class TaskComponent {
    @Input() task: Task;
    @Input() index: number;

    constructor(private store: Store<AppState>) {}

    modify(field, value) {
        this.task[field] = value;
        this.store.dispatch({ type: MODIFY, index: this.index, task: this.task });
    }

    delete() {
        this.store.dispatch({ type: DELETE, index: this.index });
    }
}

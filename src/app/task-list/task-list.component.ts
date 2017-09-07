import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ADD, MODIFY, DELETE } from './task-list.actions';
import { AppState, Task } from '../app.state';


@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.styl']
})
export class TaskListComponent {

    model: Observable<Task[]>;

    constructor(private store: Store<AppState>) {
        this.model = store.select('tasks');
    }

    addTask() {
        this.store.dispatch({ type: ADD });
    }
}

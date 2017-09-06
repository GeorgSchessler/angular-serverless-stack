import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ADD, MODIFY, DELETE } from './task-list/task-list.actions';
import { AppState, Task } from './app.state';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent {
    tasks: Observable<Task[]>;

    constructor(private store: Store<AppState>) {
        this.tasks = store.select('tasks');
    }
}

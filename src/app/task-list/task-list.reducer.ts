import * as TaskListActions from './task-list.actions';
import { Task } from '../app.state';

export type Action = TaskListActions.All;

export function taskReducer(state: Task[] = [], action: Action) {
    switch (action.type) {
        case TaskListActions.ADD: {
            state.push({ title: 'Title', description: 'Your Description' });
            return state;
        }

        case TaskListActions.MODIFY: {
            return state.map((value, index) => index === action.index ? action.task : value);
        }

        case TaskListActions.DELETE: {
            return state.filter((value, index) => index !== action.index);
        }

        default: {
            return state;
        }
    }
}

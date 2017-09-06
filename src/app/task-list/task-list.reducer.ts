import * as Actions from './task-list.actions';
import { Task } from '../app.state';

export type Action = Actions.All;

export function taskReducer(state: Task[] = [], action: Action) {
    switch (action.type) {
        case Actions.ADD: {
            state.push({ title: 'Title', description: 'Your Description' });
            return state;
        }

        case Actions.MODIFY: {
            return state.map((value, index) => index === action.index ? action.task : value);
        }

        case Actions.DELETE: {
            return state.filter((value, index) => index !== action.index);
        }

        default: {
            return state;
        }
    }
}

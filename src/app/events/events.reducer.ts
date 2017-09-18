import * as Actions from './events.actions';
import { Events as Model } from '../app.state';

export type Action = Actions.All;

const defaultModel: Model = {textFilter: '', cityFilter: '', categoryFilter: ''};

export function eventsReducer(state = defaultModel, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return {...state, ...action.model};
        }

        case Actions.DELETE: {
            return {...defaultModel};
        }

        default: {
            return state;
        }
    }
}

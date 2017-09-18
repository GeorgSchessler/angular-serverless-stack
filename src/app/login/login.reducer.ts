import * as Actions from './login.actions';
import { Login as Model } from '../app.state';

export type Action = Actions.All;

const defaultModel: Model = { email: '', password: '' };

export function loginReducer(state = defaultModel, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return {...state, ...action.model};
        }

        case Actions.DELETE: {
            return defaultModel;
        }

        default: {
            return state;
        }
    }
}

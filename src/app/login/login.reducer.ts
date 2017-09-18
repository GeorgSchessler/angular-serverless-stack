import * as Actions from './login.actions';
import { Login } from '../app.state';

export type Action = Actions.All;

const defaultModel = { email: '', password: '', user: undefined };

export function loginReducer(state: Login = defaultModel, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return {...state, ...action.model};
        }

        case Actions.DELETE: {
            return { email: state.email, password: '' };
        }

        case Actions.LOGIN: {
            state.user = action.user;
            return state;
        }

        case Actions.LOGOUT: {
            return defaultModel;
        }

        default: {
            return state;
        }
    }
}

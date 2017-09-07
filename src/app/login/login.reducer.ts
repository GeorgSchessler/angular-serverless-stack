import * as Actions from './login.actions';
import { Login } from '../app.state';

export type Action = Actions.All;

export function loginReducer(state: Login = { email: '', password: '', user: undefined }, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return action.model;
        }

        case Actions.DELETE: {
            return { email: state.email, password: '' };
        }

        case Actions.LOGIN: {
            state.user = action.user;
            return state;
        }

        case Actions.LOGOUT: {
            return { email: '', password: '', user: undefined };
        }

        default: {
            return state;
        }
    }
}

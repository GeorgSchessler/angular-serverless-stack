import * as Actions from './login.actions';
import { Login } from '../app.state';

export type Action = Actions.All;

export function loginReducer(state: Login = {email: '', password: ''}, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return action.login;
        }

        case Actions.DELETE: {
            return {email: state.email, password: ''};
        }

        default: {
            return state;
        }
    }
}

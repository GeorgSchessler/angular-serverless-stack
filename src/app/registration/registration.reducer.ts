import * as Actions from './registration.actions';
import { Registration } from '../app.state';

export type Action = Actions.All;

export function registrationReducer(state: Registration = {email: '', password: '', passwordRepeat: '', code: ''}, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return action.registration;
        }

        case Actions.DELETE: {
            return {email: state.email, password: '', passwordRepeat: ''};
        }

        default: {
            return state;
        }
    }
}

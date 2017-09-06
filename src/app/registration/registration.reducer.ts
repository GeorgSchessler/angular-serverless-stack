import * as RegistrationActions from './registration.actions';
import { Registration } from '../app.state';

export type Action = RegistrationActions.All;

export function registrationkReducer(state: Registration = {email: '', password: '', passwordRepeat: '', code: ''}, action: Action) {
    switch (action.type) {
        case RegistrationActions.MODIFY: {
            return action.registration;
        }

        case RegistrationActions.DELETE: {
            return {email: state.email, password: '', passwordRepeat: ''};
        }

        default: {
            return state;
        }
    }
}

import * as Actions from './registration.actions';
import { Registration } from '../app.state';

export type Action = Actions.All;

const defaultModel = {email: '', firstName: '', lastName: '', password: '', passwordRepeat: '', code: ''};

export function registrationReducer(state: Registration = defaultModel, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return {...state, ...action.model};
        }

        case Actions.DELETE: {
            return {...defaultModel, email: state.email};
        }

        default: {
            return state;
        }
    }
}

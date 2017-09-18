import * as Actions from './registration.actions';
import { Registration as Model } from '../app.state';

export type Action = Actions.All;

const defaultModel: Model = {email: '', firstName: '', lastName: '', password: '', passwordRepeat: '', code: ''};

export function registrationReducer(state = defaultModel, action: Action) {
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

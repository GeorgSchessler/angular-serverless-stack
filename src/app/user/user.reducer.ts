import * as Actions from './user.actions';
import { User as Model } from '../app.state';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { ADDLOCAL } from './user.actions';

export type Action = Actions.All;

const defaultModel: Model = {user: undefined, email: '', firstName: '', lastName: '', locale: []};

export function userReducer(state = defaultModel, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            return {...state, ...action.model};
        }

        case Actions.ADDLOCAL: {
            state.locale.push(action.city);
            return {...state};
        }

        case Actions.REMOVELOCAL: {
            return {...state, locale: state.locale.filter(value => value !== action.city)};
        }

        case Actions.DELETE: {
            return defaultModel;
        }

        default: {
            return state;
        }
    }
}

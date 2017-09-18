import * as Actions from './user.actions';
import { User as Model } from '../app.state';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type Action = Actions.All;

const defaultModel: Model = {user: undefined, email: '', firstName: '', lastName: '', locale: ''};

export function userReducer(state = defaultModel, action: Action) {
    switch (action.type) {
        case Actions.MODIFY: {
            console.log(state, action);
            return {...state, ...action.model};
        }

        default: {
            return state;
        }
    }
}

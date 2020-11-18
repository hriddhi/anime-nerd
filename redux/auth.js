import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Auth = produce((
    draft = {
        isLoading: false,
        err: null,
        access_token: null
    }, action) => {
        switch(action.type){
            case ActionTypes.GET_ACCESS_TOKEN:
                draft.access_token = action.payload
                return

            default:
                return draft;
        }
    }
)

export default Auth;
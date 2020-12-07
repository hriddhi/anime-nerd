import * as ActionTypes from './ActionTypes';

const Auth = (
    draft = {
        isLoading: false,
        err: null,
        access_token: null
    }, action) => {
        switch(action.type){
            case ActionTypes.GET_ACCESS_TOKEN:
                return {
                    ...draft,
                    access_token: action.payload
                }

            case ActionTypes.LOGOUT:
                return {
                    ...draft,
                    access_token: null
                }

            default:
                return draft;
        }
    }


export default Auth;
import * as ActionTypes from './ActionTypes';

const Related = (
    draft = { }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_RELATED_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        related: null,
                        err: false
                    }   
                }

            case ActionTypes.FETCH_ANIME_RELATED_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        related: action.payload.related_anime,
                        err: null
                    }   
                }

            case ActionTypes.FETCH_ANIME_RELATED_FAILED:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        related: null,
                        err: action.payload.err
                    }   
                }

            default:
                return draft
        }
    }

export default Related;
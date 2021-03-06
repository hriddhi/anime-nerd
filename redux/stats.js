import * as ActionTypes from './ActionTypes';

const Episode = (
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_STATS_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        stats: null,
                        err: false
                    }
                }

            case ActionTypes.FETCH_ANIME_STATS_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        stats: action.payload.stats,
                        err: false
                    }
                }

            default:
                return draft
        }
    }


export default Episode;
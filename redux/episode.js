import * as ActionTypes from './ActionTypes';

const Episode = (
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_EPISODES_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        err: false,
                        episodes: null
                    }
                }

            case ActionTypes.FETCH_ANIME_EPISODES_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        err: null,
                        episodes: action.payload.episodes
                    }
                }

            default:
                return draft
        }
    }


export default Episode;
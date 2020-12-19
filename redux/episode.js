import * as ActionTypes from './ActionTypes';

const Episode = (
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_EPISODES_LOADING:
                if(draft[action.payload])
                    return {
                        ...draft,
                        [action.payload]: {
                            ...draft[action.payload],
                            isLoading: true,
                            current_page: action.payload.current_page
                        }
                    }

                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        err: false,
                        episodes: null,
                        episodes_last_page: null,
                        current_page: null
                    }
                }

            case ActionTypes.FETCH_ANIME_EPISODES_SUCCESS:
                if(draft[action.payload.id].episodes !== null){
                    return {
                        ...draft,
                        [action.payload.id]: {
                            isLoading: false,
                            err: null,
                            episodes: [...draft[action.payload.id].episodes, ...action.payload.episodes],
                            episodes_last_page: action.payload.episodes_last_page,
                            current_page: action.payload.current_page
                        }
                    }
                }
                
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        err: null,
                        episodes: action.payload.episodes,
                        episodes_last_page: action.payload.episodes_last_page,
                        current_page: action.payload.current_page
                    }
                }

            default:
                return draft
        }
    }


export default Episode;
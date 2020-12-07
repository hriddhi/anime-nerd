import * as ActionTypes from './ActionTypes';

const MAL = (
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_STATUS_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        isUpdating: {
                            status: null,
                            episode: null,
                            rating: null
                        },
                        total: null,
                        status: null,
                        episode: null,
                        rating: null
                    }
                }

            case ActionTypes.FETCH_ANIME_STATUS_SUCCESS:
                if(action.payload.data.my_list_status === undefined){
                    return {
                        ...draft,
                        [action.payload.id]: {
                            ...draft[action.payload.id],
                            isLoading: false,
                            total: action.payload.data.num_episodes,
                            status: undefined
                        }
                    }
                } else {
                    return {
                        ...draft,
                        [action.payload.id]: {
                            ...draft[action.payload.id],
                            isLoading: false,
                            total: action.payload.data.num_episodes,
                            status: action.payload.data.my_list_status.status,
                            episode: action.payload.data.my_list_status.num_episodes_watched,
                            rating: action.payload.data.my_list_status.score
                        }
                    }
                }

            case ActionTypes.UPDATE_ANIME_STATUS_LOADING:
                return {
                    ...draft,
                    [action.payload.id]: {
                        ...draft[action.payload.id],
                        isUpdating: action.payload
                    }
                }

            case ActionTypes.UPDATE_ANIME_STATUS_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        ...draft[action.payload.id],
                        isUpdating: {
                            status: null,
                            episode: null,
                            rating: null
                        },
                        status: action.payload.status,
                        episode: action.payload.num_episodes_watched,
                        rating: action.payload.score
                    }
                }

            case ActionTypes.DELETE_LIST_ANIME_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        ...draft[action.payload],
                        isDeleting: true
                    }
                }

            case ActionTypes.DELETE_LIST_ANIME_SUCCESS:
                return {
                    ...draft,
                    [action.payload]: {
                        ...draft[action.payload],
                        isDeleting: false,
                        status: null
                    }
                }

            default:
                return draft
        }
    }


export default MAL;
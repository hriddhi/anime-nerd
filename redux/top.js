import * as ActionTypes from './ActionTypes';

const Top = (
    draft = {
        all: {
            loading: false,
            err: false,
            page: undefined,
            data: []
        },
        airing: {
            loading: false,
            err: false,
            page: 0,
            data: []
        },
        upcoming: {
            loading: false,
            err: false,
            page: 0,
            data: []
        },
        movie: {
            loading: false,
            err: false,
            page: 0,
            data: []
        },
        tv: {
            loading: false,
            err: false,
            page: 0,
            data: []
        },
        characters: {
            loading: false,
            err: false,
            page: 0,
            data: []
        }
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_TOP_ANIME_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        ...draft[action.payload],
                        loading: true
                    }
                }

            case ActionTypes.FETCH_TOP_ANIME_SUCCESS:
                return {
                    ...draft,
                    [action.payload.type]: {
                        ...draft[action.payload.type],
                        loading: false,
                        page: action.payload.page,
                        data: [...draft[action.payload.type].data, ...action.payload.data]   
                    }
                }

            case ActionTypes.FETCH_TOP_ANIME_ERROR:
                console.log('FETCH_TOP_ANIME_ERROR')
                return {
                    ...draft,
                    [action.payload]: {
                        ...draft[action.payload],
                        loading: false,
                        err: true
                    }
                }

            default:
                return draft
        }
    }


export default Top;
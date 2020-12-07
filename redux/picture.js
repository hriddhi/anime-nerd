import * as ActionTypes from './ActionTypes';

const Pictures = (
    draft = { }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_PICTURE_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        pictures: null,
                        err: false
                    }
                }

            case ActionTypes.FETCH_ANIME_PICTURE_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        pictures: action.payload.pictures,
                        err: false
                    }
                }

            default:
                return draft
        }
}


export default Pictures;
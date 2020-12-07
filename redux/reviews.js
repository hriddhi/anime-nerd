import * as ActionTypes from './ActionTypes';

const Reviews = (
    draft = { }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_REVIEWS_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        reviews: null,
                        err: false
                    }   
                }

            case ActionTypes.FETCH_ANIME_REVIEWS_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        reviews: action.payload.reviews,
                        err: false
                    }   
                }

            default:
                return draft
        }
    }


export default Reviews;
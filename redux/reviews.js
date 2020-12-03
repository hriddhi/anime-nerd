import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Reviews = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_REVIEWS_LOADING:
                draft[action.payload] = {
                    isLoading: true,
                    reviews: null,
                    err: false
                }
                return

            case ActionTypes.FETCH_ANIME_REVIEWS_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].reviews = action.payload.reviews
                return

            default:
                return draft
        }
    }
)

export default Reviews;
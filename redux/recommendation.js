import * as ActionTypes from './ActionTypes';

const Recommendation = (
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_RECOMMEND_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        recommendation: null,
                        err: false
                    }   
                }

            case ActionTypes.FETCH_ANIME_RECOMMEND_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        recommendation: action.payload.recommendation.recommendations,
                        err: null
                    }   
                }

            case ActionTypes.FETCH_ANIME_RECOMMEND_FAILED:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        recommendation: null,
                        err: action.payload.err
                    }   
                }

            default:
                return draft
        }
    }


export default Recommendation;
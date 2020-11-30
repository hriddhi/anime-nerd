import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Recommendation = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_RECOMMEND_LOADING:
                draft[action.payload] = {
                    isLoading: true,
                    err: false,
                    recommendation: null
                }
                return

            case ActionTypes.FETCH_ANIME_RECOMMEND_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].recommendation = action.payload.recommendation.recommendations
                draft[action.payload.id].err = null
                return

            case ActionTypes.FETCH_ANIME_RELATED_FAILED:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].err = action.payload.err
                return

            default:
                return draft
        }
    }
)

export default Recommendation;
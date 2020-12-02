import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Episode = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_STATS_LOADING:
                draft[action.payload] = {
                    isLoading: true,
                    stats: null,
                    err: false
                }
                return

            case ActionTypes.FETCH_ANIME_STATS_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].stats = action.payload.stats
                return

            default:
                return draft
        }
    }
)

export default Episode;
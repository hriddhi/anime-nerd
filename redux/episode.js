import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Episode = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_EPISODES_LOADING:
                draft[action.payload] = {
                    isLoading: true,
                    episodes: null,
                    err: false
                }
                return

            case ActionTypes.FETCH_ANIME_EPISODES_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].episodes = action.payload.episodes
                return

            default:
                return draft
        }
    }
)

export default Episode;
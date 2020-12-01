import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Related = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_RELATED_LOADING:
                draft[action.payload] = {
                    isLoading: true,
                    err: false,
                    related: null
                }
                return

            case ActionTypes.FETCH_ANIME_RELATED_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].related = action.payload.related_anime
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

export default Related;
import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Anime = produce((
    draft = {
        isLoading: false,
        err: null,
        anime: null,
        id: null
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_LOADING:
                draft.id = action.payload
                draft.isLoading = true
                return

            case ActionTypes.FETCH_ANIME_SUCCESS:
                draft.isLoading = false
                draft.anime = action.payload
                return

            default:
                return draft;
        }
    }
)

export default Anime;
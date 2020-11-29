import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Anime = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_CHARACTER_LOADING:
                draft[action.payload] = {
                    isLoading: true,
                    err: false,
                    character: null
                }
                return

            case ActionTypes.FETCH_ANIME_CHARACTER_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].character = action.payload.character.characters
                draft[action.payload.id].err = null
                return

            case ActionTypes.FETCH_ANIME_CHARACTER_FAILED:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].err = action.payload.err
                return

            default:
                return draft
        }
    }
)

export default Anime;
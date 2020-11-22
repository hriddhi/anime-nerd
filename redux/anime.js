import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Anime = produce((
    draft = {
        isLoading: false,
        isUpdating: {
            id: null,
            status: null,
            episode: null
        },
        err: null,
        anime: null,
        id: null
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_LOADING:
                draft.id = action.payload
                draft.isLoading = true
                draft.anime = null
                return

            case ActionTypes.FETCH_ANIME_SUCCESS:
                draft.isLoading = false
                draft.anime = action.payload
                return

            case ActionTypes.UPDATE_ANIME_STATUS_LOADING:
                draft.isUpdating = action.payload
                console.log(JSON.stringify(action.payload))
                return

            case ActionTypes.UPDATE_ANIME_STATUS_SUCCESS:
                draft.isUpdating = {
                    id: null,
                    status: null,
                    episode: null
                }
                draft.anime.my_list_status = action.payload
                return

            case ActionTypes.UPDATE_ANIME_EPISODE_LOADING:
                draft.isUpdating = action.payload
                return

            case ActionTypes.UPDATE_ANIME_EPISODE_SUCCESS:
                draft.isUpdating = {
                    id: null,
                    episode: null
                }
                draft.anime.my_list_status = action.payload
                return

            default:
                return draft;
        }
    }
)

export default Anime;
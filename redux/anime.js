import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Anime = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_LOADING:
                draft[action.payload] = {
                    id: action.payload,
                    isLoading: true,
                    isUpdating: {
                        id: null,
                        status: null,
                        episode: null,
                        rating: null
                    },
                    isDeleting: null,
                    anime: null,
                    loadingEpisodes: false,
                    episodes: []
                }
                return

            case ActionTypes.FETCH_ANIME_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].anime = action.payload
                return

            case ActionTypes.UPDATE_ANIME_STATUS_LOADING:
                draft[action.payload.id].isUpdating = action.payload
                return

            case ActionTypes.UPDATE_ANIME_STATUS_SUCCESS:
                draft[action.payload.id].isUpdating = {
                    id: null,
                    status: null,
                    episode: null,
                    rating: null
                }
                draft[action.payload.id].anime.my_list_status = action.payload
                return

            case ActionTypes.DELETE_LIST_ANIME_LOADING:
                draft[action.payload].isDeleting = true
                return

            case ActionTypes.FETCH_ANIME_EPISODES_LOADING:
                draft[action.payload].loadingEpisodes = true
                return

            case ActionTypes.FETCH_ANIME_EPISODES_SUCCESS:
                draft[action.payload.id].loadingEpisodes = false
                draft[action.payload.id].episodes = action.payload.episodes
                return

            default:
                return draft
        }
    }
)

export default Anime;
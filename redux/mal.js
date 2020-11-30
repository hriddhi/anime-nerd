import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const MAL = produce((
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_STATUS_LOADING:
                draft[action.payload] = {
                    isLoading: true,
                    isUpdating: {
                        status: null,
                        episode: null,
                        rating: null
                    },
                    total: null,
                    status: null,
                    episode: null,
                    rating: null
                }
                return

            case ActionTypes.FETCH_ANIME_STATUS_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].total = action.payload.data.num_episodes
                if(action.payload.data.my_list_status === undefined){
                    draft[action.payload.id].status = undefined
                    return
                }
                draft[action.payload.id].status = action.payload.data.my_list_status.status
                draft[action.payload.id].episode = action.payload.data.my_list_status.num_episodes_watched
                draft[action.payload.id].rating = action.payload.data.my_list_status.score
                return

            case ActionTypes.UPDATE_ANIME_STATUS_LOADING:
                draft[action.payload.id].isUpdating = action.payload
                return

            case ActionTypes.UPDATE_ANIME_STATUS_SUCCESS:
                draft[action.payload.id].isUpdating = {
                    status: null,
                    episode: null,
                    rating: null
                }
                draft[action.payload.id].status = action.payload.status
                draft[action.payload.id].episode = action.payload.num_episodes_watched
                draft[action.payload.id].rating = action.payload.score
                return

            case ActionTypes.DELETE_LIST_ANIME_LOADING:
                draft[action.payload].isDeleting = true
                return

            case ActionTypes.DELETE_LIST_ANIME_SUCCESS:
                draft[action.payload].isDeleting = false
                draft[action.payload].status = null

            default:
                return draft
        }
    }
)

export default MAL;
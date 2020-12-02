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
                    err: null,
                    anime: null,
                    loadingSongs: false,
                    songErr: false,
                    songs:[]
                }
                return

            case ActionTypes.FETCH_ANIME_SUCCESS:
                draft[action.payload.id].isLoading = false
                draft[action.payload.id].anime = action.payload
                return

            case ActionTypes.FETCH_ANIME_SONGS_LOADING:
                draft[action.payload].loadingSongs = true
                draft[action.payload].songErr = false
                return

            case ActionTypes.FETCH_ANIME_SONGS_ERROR:
                draft[action.payload].songErr = true
                return

            case ActionTypes.FETCH_ANIME_SONGS_SUCCESS:
                draft[action.payload.id].loadingSongs = false
                draft[action.payload.id].songErr = false
                draft[action.payload.id].songs = action.payload.songs
                return

            default:
                return draft
        }
    }
)

export default Anime;
import * as ActionTypes from './ActionTypes';

const Anime = (
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        id: action.payload,
                        isLoading: true,
                        err: null,
                        anime: null,
                        loadingSongs: false,
                        songErr: false,
                        songs:[]
                    }
                }

            case ActionTypes.FETCH_ANIME_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        ...action.payload.id,
                        isLoading: false,
                        anime: action.payload
                    }
                }

            case ActionTypes.FETCH_ANIME_SONGS_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        ...action.payload,
                        loadingSongs: true,
                        songErr: false
                    }
                }

            case ActionTypes.FETCH_ANIME_SONGS_ERROR:
                return {
                    ...draft,
                    [action.payload]: {
                        ...action.payload,
                        songErr: true
                    }
                }
 
            case ActionTypes.FETCH_ANIME_SONGS_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        ...action.payload.id,
                        loadingSongs: false,
                        songErr: false,
                        songs: action.payload.songs
                    }
                }

            default:
                return draft
        }
    }


export default Anime;
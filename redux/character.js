import * as ActionTypes from './ActionTypes';

const Anime = (
    draft = {
        
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_ANIME_CHARACTER_LOADING:
                return {
                    ...draft,
                    [action.payload]: {
                        isLoading: true,
                        err: false,
                        character: null
                    }
                }

            case ActionTypes.FETCH_ANIME_CHARACTER_SUCCESS:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        err: null,
                        character: action.payload.character.characters
                    }
                }

            case ActionTypes.FETCH_ANIME_CHARACTER_FAILED:
                return {
                    ...draft,
                    [action.payload.id]: {
                        isLoading: false,
                        err: action.payload.err,
                        character: null
                    }
                }

            default:
                return draft
        }
    }


export default Anime;
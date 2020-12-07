import * as ActionTypes from './ActionTypes';

const Search = (
    draft = {
        isLoading: false,
        err: null,
        visible: false,
        result: [],
        previous_search: [],
        search: ''
    }, action) => {
        switch(action.type){
            case ActionTypes.UPDATE_SEARCH_LOADING:
                return { ...draft, isLoading: true }

            case ActionTypes.UPDATE_SEARCH_SUCCESS:
                if(action.payload.length > 0)
                    return { ...draft, isLoading: false, result: action.payload, visible: true }
                else
                    return { ...draft, isLoading: false, result: action.payload, visible: false }

            case ActionTypes.ADD_PREVIOUS_SEARCH:
                if(draft.previous_search.findIndex((x) => x.title === action.payload.title) === -1){
                    var temp = draft.previous_search
                    temp.push(action.payload)
                    return { ...draft, previous_search: temp }
                } else {
                    return draft
                }

            case ActionTypes.CLEAR_PREVIOUS_SEARCH:
                return { ...draft, previous_search: [] }

            default:
                return draft;
        }
    }


export default Search;
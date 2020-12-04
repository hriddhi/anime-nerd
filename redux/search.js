import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const Search = produce((
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
                draft.isLoading = true
                return

            case ActionTypes.UPDATE_SEARCH_SUCCESS:
                draft.isLoading = false
                draft.result = action.payload;
                if(action.payload.length > 0)
                    draft.visible = true
                else
                    draft.visible = false
                return;

            case ActionTypes.ADD_PREVIOUS_SEARCH:
                if(!draft.previous_search.includes(action.payload))
                    draft.previous_search.push(action.payload)
                return

            case ActionTypes.CLEAR_PREVIOUS_SEARCH:
                draft.previous_search = []
                return

            default:
                return draft;
        }
    }
)

export default Search;
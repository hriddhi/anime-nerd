import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const List = produce((
    draft = {
        isLoading: false,
        err: null,
        completed: null,
        visible: {
            completed: false
        }
    }, action) => {
        switch(action.type){
            case ActionTypes.FETCH_USER_COMPLETED_LOADING:
                draft.isLoading = 'completed'
                return

            case ActionTypes.FETCH_USER_COMPLETED_SUCCESS:
                draft.isLoading = false
                draft.completed = action.payload
                draft.visible.completed = true
                return

            default:
                return draft;
        }
    }
)

export default List;
import * as ActionTypes from './ActionTypes';
import produce from 'immer';

const List = produce((
    draft = {
        isLoading: {
            watching: false,
            plan_to_watch: false,
            dropped: false,
            completed: false,
            on_hold: false
        },
        err: null,
        watching: null,
        plan_to_watch: null,
        dropped: null,
        completed: null,
        on_hold: null,
        visible: {
            watching: false,
            plan_to_watch: false,
            dropped: false,
            completed: false,
            on_hold: false
        }
    }, action) => {
        switch(action.type){
            case ActionTypes.UPDATE_LIST_ANIME_SUCCESS:
                if(draft[action.payload.status] !== null){
                    var i = draft[action.payload.status].data.findIndex((val) => val.node.id === action.payload.id)
                    if(i !== -1){
                        draft[action.payload.status].data[i].node.my_list_status = action.payload
                    }
                }
                return

            case ActionTypes.FETCH_USER_WATCHING_LOADING:
                draft.isLoading.watching = true
                return

            case ActionTypes.FETCH_USER_WATCHING_SUCCESS:
                draft.isLoading.watching = false
                draft.watching = action.payload
                draft.visible.watching = true
                return

            case ActionTypes.FETCH_USER_PLAN_LOADING:
                draft.isLoading.plan_to_watch = true
                return

            case ActionTypes.FETCH_USER_PLAN_SUCCESS:
                draft.isLoading.plan_to_watch = false
                draft.plan_to_watch = action.payload
                draft.visible.plan_to_watch = true
                return

            case ActionTypes.FETCH_USER_HOLD_LOADING:
                draft.isLoading.on_hold = true
                return

            case ActionTypes.FETCH_USER_HOLD_SUCCESS:
                draft.isLoading.on_hold = false
                draft.on_hold = action.payload
                draft.visible.on_hold = true
                return

            case ActionTypes.FETCH_USER_DROPPED_LOADING:
                draft.isLoading.dropped = true
                return

            case ActionTypes.FETCH_USER_DROPPED_SUCCESS:
                draft.isLoading.dropped = false
                draft.dropped = action.payload
                draft.visible.dropped = true
                return

            case ActionTypes.FETCH_USER_COMPLETED_LOADING:
                draft.isLoading.completed = true
                return

            case ActionTypes.FETCH_USER_COMPLETED_SUCCESS:
                draft.isLoading.completed = false
                draft.completed = action.payload
                draft.visible.completed = true
                return

            default:
                return draft;
        }
    }
)

export default List;
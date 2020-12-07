import * as ActionTypes from './ActionTypes';

const List = (
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
                        var temp = draft[action.payload.status].data
                        temp[i] = {
                            node: {
                                ...draft[action.payload.status].data[i].node,
                                my_list_status: action.payload
                            }
                        }
                        return {
                            ...draft,
                            [action.payload.status]: {
                                ...draft[action.payload.status],
                                data: [ ...temp ]
                            }
                        }
                    } else {
                        return draft
                    }
                }
 
            case ActionTypes.FETCH_USER_WATCHING_LOADING:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        watching: true
                    }
                }

            case ActionTypes.FETCH_USER_WATCHING_SUCCESS:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        watching: false
                    },
                    watching: action.payload,
                    visible: {
                        ...draft.visible,
                        watching: true
                    }
                }

            case ActionTypes.FETCH_USER_PLAN_LOADING:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        plan_to_watch: true
                    }
                }

            case ActionTypes.FETCH_USER_PLAN_SUCCESS:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        plan_to_watch: false
                    },
                    plan_to_watch: action.payload,
                    visible: {
                        ...draft.visible,
                        plan_to_watch: true
                    }
                }

            case ActionTypes.FETCH_USER_HOLD_LOADING:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        on_hold: true
                    }
                }

            case ActionTypes.FETCH_USER_HOLD_SUCCESS:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        on_hold: false
                    },
                    on_hold: action.payload,
                    visible: {
                        ...draft.visible,
                        on_hold: true
                    }
                }

            case ActionTypes.FETCH_USER_DROPPED_LOADING:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        dropped: true
                    }
                }

            case ActionTypes.FETCH_USER_DROPPED_SUCCESS:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        dropped: false
                    },
                    dropped: action.payload,
                    visible: {
                        ...draft.visible,
                        dropped: true
                    }
                }

            case ActionTypes.FETCH_USER_COMPLETED_LOADING:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        completed: true
                    }
                }

            case ActionTypes.FETCH_USER_COMPLETED_SUCCESS:
                return {
                    ...draft,
                    isLoading: {
                        ...draft.isLoading,
                        completed: false
                    },
                    completed: action.payload,
                    visible: {
                        ...draft.visible,
                        completed: true
                    }
                }

            default:
                return draft;
        }
    }


export default List;
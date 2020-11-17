import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const updateSearch = (str) => (dispatch) => {
    dispatch(updateSearchLoading())
    axios.get(`http://192.168.56.1:3000/anime/${str.replace(' ', '+')}`)
    .then(res => {
        //console.log(res.data)
        dispatch(updateSearchSuccess(res.data))
    })
    .catch(err => {
        console.error(err.message)
    })
}

export const updateSearchLoading = () => ({
    type: ActionTypes.UPDATE_SEARCH_LOADING
})

export const updateSearchSuccess = (res) => ({
    type: ActionTypes.UPDATE_SEARCH_SUCCESS,
    payload: res
})

export const toggleSearch = () => ({
    type: ActionTypes.TOGGLE_SEARCH
})
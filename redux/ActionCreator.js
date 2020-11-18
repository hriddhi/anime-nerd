import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const getToken = (token) => ({
    type: ActionTypes.GET_ACCESS_TOKEN,
    payload: token
})

export const updateSearch = (str, token) => (dispatch) => {
    dispatch(updateSearchLoading())
    axios.get(`http://192.168.56.1:3000/anime/search/${str.replace(' ', '+')}?token=${token}`)
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
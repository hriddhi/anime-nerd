import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const getToken = (token) => ({
    type: ActionTypes.GET_ACCESS_TOKEN,
    payload: token
})

// ---------------------------------------------------

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

// ---------------------------------------

export const fetchAnime = (id, token) => (dispatch) => {

    dispatch(fetchAnimeLoading(id))

    axios.get(`http://192.168.56.1:3000/anime/${id}?token=${token}`)
    .then((res) => {
        dispatch(fetchAnimeSuccess(res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_LOADING,
    payload: id
})

export const fetchAnimeSuccess = (data) => ({
    type: ActionTypes.FETCH_ANIME_SUCCESS,
    payload: data
})
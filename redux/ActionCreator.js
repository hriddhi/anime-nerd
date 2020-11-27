import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const getToken = (token) => ({
    type: ActionTypes.GET_ACCESS_TOKEN,
    payload: token
})

// ---------------------------------------------------

export const updateSearch = (str, token) => (dispatch) => {
    dispatch(updateSearchLoading())
    axios.get(`https://api.myanimelist.net/v2/anime?q=${str}&fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        dispatch(updateSearchSuccess(response.data.data))
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

    axios.get(`https://api.myanimelist.net/v2/anime/${id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((res) => {
        axios.get(`https://api.jikan.moe/v3/anime/${id}/characters_staff`)
        .then((res1) => {
            dispatch(fetchAnimeSuccess({ ...res.data, ...res1.data }))
        })
        .catch((err) => {
            console.error(err.message)
        })
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

// ------------------------------------------

export const updateAnime = (id, props, token) => (dispatch) => {
    var obj = {
        status: null,
        episode: null,
        rating: null
    }
    
    const formdata = []
    if(props.status !== undefined){
        formdata.push(`status=${props.status.split('-')[0]}`)
        obj.status = props.status.split('-')[0]
    }
    if(props.episode !== undefined){
        formdata.push(`num_watched_episodes=${props.episode}`)
        obj.episode = props.episode
    }
    if(props.rating !== undefined){
        formdata.push(`score=${props.rating}`)
        obj.rating = props.rating
    }

    dispatch(updateAnimeLoading(id, obj))

    axios.patch(`https://api.myanimelist.net/v2/anime/${id}/my_list_status`, formdata.join('&'), {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((res) => {
        dispatch(updateAnimeSuccess(res.data, id))
        if(props.status){
            dispatch(fetchUserAnime(props.status.split('-')[0], token))
            props.status.split('-')[1] !== undefined ? dispatch(fetchUserAnime(props.status.split('-')[1], token)) : null
        }
        dispatch(updateListAnimeSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const updateAnimeLoading = (id, props) => ({
    type: ActionTypes.UPDATE_ANIME_STATUS_LOADING,
    payload: { id, ...props }
})

export const updateAnimeSuccess = (data, id) => ({
    type: ActionTypes.UPDATE_ANIME_STATUS_SUCCESS,
    payload: { ...data, id }
})

export const updateListAnimeSuccess = (id, data) => ({
    type: ActionTypes.UPDATE_LIST_ANIME_SUCCESS,
    payload: {...data, id}
})

// -----------------------------------------------

export const deleteListAnime = (id, status, token) => (dispatch) => {
    dispatch(deleteListAnimeLoading(id))

    axios.delete(`https://api.myanimelist.net/v2/anime/${id}/my_list_status`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        dispatch(fetchAnime(id, token))
        dispatch(fetchUserAnime(status, token))
    })
    .catch(err => console.error(err.message))
}

export const deleteListAnimeLoading = (id) => ({
    type: ActionTypes.DELETE_LIST_ANIME_LOADING,
    payload: id
})

// ------------------------------------------------

export const fetchUserAnime = (type, token) => (dispatch) => {
    console.info(type)
    switch(type){
        case 'watching':
            dispatch(fetchWatchingLoading())
            axios.get(`https://api.myanimelist.net/v2/users/@me/animelist?status=watching&sort=list_updated_at&limit=1000&fields=my_list_status,num_episodes`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {
                dispatch(fetchWatchingSuccess(res.data))
            })
            .catch(err => {
                console.error(err.message)
            })
            break

        case 'plan_to_watch':
            dispatch(fetchPlannedLoading())
            axios.get(`https://api.myanimelist.net/v2/users/@me/animelist?status=plan_to_watch&sort=list_updated_at&limit=1000&fields=my_list_status,num_episodes`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {
                dispatch(fetchPlanedSuccess(res.data))
            })
            .catch(err => {
                console.error(err.message)
            })
            break

        case 'on_hold':
            dispatch(fetchHoldLoading())
            axios.get(`https://api.myanimelist.net/v2/users/@me/animelist?status=on_hold&sort=list_updated_at&limit=1000&fields=my_list_status,num_episodes`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {
                dispatch(fetchHoldSuccess(res.data))
            })
            .catch(err => {
                console.error(err.message)
            })
            break

        case 'dropped':
            dispatch(fetchDroppedLoading())
            axios.get(`https://api.myanimelist.net/v2/users/@me/animelist?status=dropped&sort=list_updated_at&limit=1000&fields=my_list_status,num_episodes`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {
                dispatch(fetchDroppedSuccess(res.data))
            })
            .catch(err => {
                console.error(err.message)
            })
            break

        case 'completed':
            dispatch(fetchCompletedLoading())
            axios.get(`https://api.myanimelist.net/v2/users/@me/animelist?status=completed&sort=list_updated_at&limit=1000&fields=my_list_status,num_episodes`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {
                dispatch(fetchCompletedSuccess(res.data))
            })
            .catch(err => {
                console.error(err.message)
            })
            break
    }
}

export const fetchWatchingLoading = () => ({
    type: ActionTypes.FETCH_USER_WATCHING_LOADING
})

export const fetchPlannedLoading = () => ({
    type: ActionTypes.FETCH_USER_PLAN_LOADING
})

export const fetchDroppedLoading = () => ({
    type: ActionTypes.FETCH_USER_DROPPED_LOADING
})

export const fetchHoldLoading = () => ({
    type: ActionTypes.FETCH_USER_HOLD_LOADING
})

export const fetchCompletedLoading = () => ({
    type: ActionTypes.FETCH_USER_COMPLETED_LOADING
})

export const fetchWatchingSuccess = (data) => ({
    type: ActionTypes.FETCH_USER_WATCHING_SUCCESS,
    payload: data
})

export const fetchPlanedSuccess = (data) => ({
    type: ActionTypes.FETCH_USER_PLAN_SUCCESS,
    payload: data
})

export const fetchDroppedSuccess = (data) => ({
    type: ActionTypes.FETCH_USER_DROPPED_SUCCESS,
    payload: data
})

export const fetchHoldSuccess = (data) => ({
    type: ActionTypes.FETCH_USER_HOLD_SUCCESS,
    payload: data
})

export const fetchCompletedSuccess = (data) => ({
    type: ActionTypes.FETCH_USER_COMPLETED_SUCCESS,
    payload: data
})

// ---------------------------------------------

export const fetchAnimeEpisodes = (id) => (dispatch) => {

    dispatch(fetchAnimeEpisodesLoading(id))
    axios.get(`https://api.jikan.moe/v3/anime/${id}/episodes`)
    .then((res) => {
        dispatch(fetchAnimeEpisodesSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeEpisodesLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_EPISODES_LOADING,
    payload: id
})

export const fetchAnimeEpisodesSuccess = (id, data) => ({
    type: ActionTypes.FETCH_ANIME_EPISODES_SUCCESS,
    payload: { episodes: data.episodes, id }
})
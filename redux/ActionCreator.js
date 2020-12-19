import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { ToastAndroid } from 'react-native'

export const getToken = (token) => ({
    type: ActionTypes.GET_ACCESS_TOKEN,
    payload: token
})

export const logout = () => ({
    type: ActionTypes.LOGOUT
})

// ---------------------------------------------------

export const updateSearch = (str) => (dispatch) => {

    if(str.length < 3){
        ToastAndroid.show('Enter atleast 3 character', ToastAndroid.SHORT)
        return
    }

    dispatch(updateSearchLoading())
    axios.get(`https://api.jikan.moe/v3/search/anime?q=${str}&limit=10`)
    .then(response => {
        dispatch(updateSearchSuccess(response.data.results))
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

export const addPreviousSearch = (search) => ({
    type: ActionTypes.ADD_PREVIOUS_SEARCH,
    payload: search
})

export const clearPreviousSearch = () => ({
    type: ActionTypes.CLEAR_PREVIOUS_SEARCH
})

// ---------------------------------------

export const fetchAnime = (id, token) => (dispatch) => {

    dispatch(fetchAnimeLoading(id))
    axios.get(`https://api.jikan.moe/v3/anime/${id}`)
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
    payload: {
        "id": data.mal_id,
        "url": data.url,
        "image_url": data.image_url,
        "title": data.title,
        "title_english": data.title_english,
        "title_japanese": data.title_japanese,
        "media_type": data.type,
        "source": data.source,
        "num_episodes": data.episodes,
        "status": data.status,
        "airing": data.airing,
        "aired": data.aired.string,
        "duration": data.duration,
        "rating": data.rating,
        "mean": data.score,
        "rank": data.rank,
        "popularity": data.popularity,
        "synopsis": data.synopsis,
        "premiered": data.premiered,
        "related": data.related,
        "producers": data.producers,
        "studios": data.studios,
        "genres": data.genres,
        "opening_themes": data.opening_themes,
        "ending_themes": data.ending_themes
    }
})

// ------------------------------------------------

export const fetchUserAnime = (type, token) => (dispatch) => {
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

// -------------------------------------------

export const fetchAnimeSongs = (id, name) => (dispatch) => {
    dispatch(fetchAnimeSongsLoading(id))
    axios.get("https://animenerd.herokuapp.com/anime/song/" + name.replace(/ /g, '-'))
    .then(res => {
        dispatch(fetchAnimeSongsSuccess(id, res.data))
    })
    .catch(err => dispatch(fetchAnimeSongsError(id)))
}

export const fetchAnimeSongsError = (id) => ({
    type: ActionTypes.FETCH_ANIME_SONGS_ERROR,
    payload: id
})

export const fetchAnimeSongsLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_SONGS_LOADING,
    payload: id
})

export const fetchAnimeSongsSuccess = (id, data) => ({
    type: ActionTypes.FETCH_ANIME_SONGS_SUCCESS,
    payload: { songs: data.data, id: id }
})

// ================== NEW SECTION ====================

export const fetchAnimeCharacter = (id) => (dispatch) => {
    dispatch(fetchAnimeCharacterLoading(id))

    axios.get(`https://api.jikan.moe/v3/anime/${id}/characters_staff`)
    .then((res) => {
        dispatch(fetchAnimeCharacterSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeCharacterLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_CHARACTER_LOADING,
    payload: id
})

export const fetchAnimeCharacterSuccess = (id, character) => ({
    type: ActionTypes.FETCH_ANIME_CHARACTER_SUCCESS,
    payload: { id, character }
})

// ----------------

export const fetchCharacterDetail = (url) => (dispatch) => {
    // axios.get(url)
    // .then((res) => {

    // })
    // .catch((err) => {
    //     console.error(err.message)
    // })
}

export const fetchCharacterDetailLoading = () => ({
    type: ActionTypes.FETCH_CHARACTER_DETAIL_LOADING
})

export const fetchCharacterDetailSuccess = (data) => ({
    type: ActionTypes.FETCH_CHARACTER_DETAIL_SUCCESS,
    payload: data
})

// -----

export const fetchAnimeRecommendation = (id) => (dispatch) => {
    dispatch(fetchAnimeRecommendationLoading(id))

    axios.get(`https://api.jikan.moe/v3/anime/${id}/recommendations`)
    .then((res) => {
        dispatch(fetchAnimeRecommendationSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeRecommendationLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_RECOMMEND_LOADING,
    payload: id
})

export const fetchAnimeRecommendationSuccess = (id, recommendation) => ({
    type: ActionTypes.FETCH_ANIME_RECOMMEND_SUCCESS,
    payload: { id, recommendation }
})

// ---------------

export const fetchAnimeRelated = (id, token) => (dispatch) => {
    dispatch(fetchAnimeRelatedLoading(id))

    axios.get(`https://api.myanimelist.net/v2/anime/${id}?fields=id,related_anime`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((res) => {
        dispatch(fetchAnimeRelatedSuccess(id, res.data))

    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeRelatedLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_RELATED_LOADING,
    payload: id
})

export const fetchAnimeRelatedSuccess = (id, related) => ({
    type: ActionTypes.FETCH_ANIME_RELATED_SUCCESS,
    payload: related
})

// ------------------

export const fetchAnimeEpisodes = (id, page) => (dispatch) => {

    dispatch(fetchAnimeEpisodesLoading(id))
    console.log('Loading ------------ ' + page)

    axios.get(`https://api.jikan.moe/v3/anime/${id}/episodes/${page}`)
    .then((res) => {
        dispatch(fetchAnimeEpisodesSuccess(id, res.data, page))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeEpisodesLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_EPISODES_LOADING,
    payload: id
})

export const fetchAnimeEpisodesSuccess = (id, data, page) => ({
    type: ActionTypes.FETCH_ANIME_EPISODES_SUCCESS,
    payload: { 
        episodes: data.episodes, 
        id, 
        episodes_last_page: data.episodes_last_page, 
        current_page: page 
    }
})

// ------------------------------------------

export const fetchAnimeStatus = (id, token) => (dispatch) => {

    dispatch(fetchAnimeStatusLoading(id))

    axios.get(`https://api.myanimelist.net/v2/anime/${id}?fields=id,my_list_status,num_episodes`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then((res) => {
        dispatch(fetchAnimeStatusSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeStatusLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_STATUS_LOADING,
    payload: id
})

export const fetchAnimeStatusSuccess = (id, data) => ({
    type: ActionTypes.FETCH_ANIME_STATUS_SUCCESS,
    payload: { id, data }
})

// --------------------------------------------

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
        dispatch(deleteListAnimeSuccess(id))
        dispatch(fetchUserAnime(status, token))
    })
    .catch(err => console.error(err.message))
}

export const deleteListAnimeLoading = (id) => ({
    type: ActionTypes.DELETE_LIST_ANIME_LOADING,
    payload: id
})

export const deleteListAnimeSuccess = (id) => ({
    type: ActionTypes.DELETE_LIST_ANIME_SUCCESS,
    payload: id
})

// -------------

export const fetchAnimeStats = (id) => (dispatch) => {

    dispatch(fetchAnimeStatsLoading(id))

    axios.get(`https://api.jikan.moe/v3/anime/${id}/stats`)
    .then((res) => {
        dispatch(fetchAnimeStatsSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeStatsLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_STATS_LOADING,
    payload: id
})

export const fetchAnimeStatsSuccess = (id, data) => ({
    type: ActionTypes.FETCH_ANIME_STATS_SUCCESS,
    payload: { id, stats: data }
})

// ------------------

export const fetchAnimePictures = (id) => (dispatch) => {

    dispatch(fetchAnimePicturesLoading(id))

    axios.get(`https://api.jikan.moe/v3/anime/${id}/pictures`)
    .then((res) => {
        dispatch(fetchAnimePicturesSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimePicturesLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_PICTURE_LOADING,
    payload: id
})

export const fetchAnimePicturesSuccess = (id, data) => ({
    type: ActionTypes.FETCH_ANIME_PICTURE_SUCCESS,
    payload: { id, pictures: data.pictures }
})

// -----------

export const fetchAnimeReviews = (id) => (dispatch) => {

    dispatch(fetchAnimeReviewsLoading(id))
    axios.get(`https://api.jikan.moe/v3/anime/${id}/reviews`)
    .then((res) => {
        dispatch(fetchAnimeReviewsSuccess(id, res.data))
    })
    .catch((err) => {
        console.error(err.message)
    })
}

export const fetchAnimeReviewsLoading = (id) => ({
    type: ActionTypes.FETCH_ANIME_REVIEWS_LOADING,
    payload: id
})

export const fetchAnimeReviewsSuccess = (id, data) => ({
    type: ActionTypes.FETCH_ANIME_REVIEWS_SUCCESS,
    payload: { reviews: data.reviews, id }
})

// ==============================

export const changeTheme = (theme) => ({
    type: ActionTypes.CHANGE_THEME,
    payload: theme
})

export const toggleImageBackground = () => ({
    type: ActionTypes.TOGGLE_IMAGE_BACKGROUND
})








// SFDGGDSFGDGDFFG DFGFDGSFGGSDFGFDG GDFGSDFGSDFGSDGSG









export const fetchTopAnime = (type, page) => (dispatch) => {
    if(type === 'all') {
        dispatch(fetchTopAnimeLoading('all'))
        axios.get(`https://api.jikan.moe/v3/top/anime`)
        .then((res) => {
            dispatch(fetchTopAnimeSuccess(res.data.top, 'all', undefined))
        })
        .catch((err) => {
            console.error(type + ' ' + err.message)
            dispatch(fetchTopAnimeFailed(type))
        })
    } else if(type === 'characters') {
        dispatch(fetchTopAnimeLoading('characters'))
        axios.get(`https://api.jikan.moe/v3/top/characters/${page}`)
        .then((res) => {
            dispatch(fetchTopAnimeSuccess(res.data.top, 'characters', page))
        })
        .catch((err) => {
            console.error(type + ' ' + err.message)
            dispatch(fetchTopAnimeFailed(type))
        })
    } else {
        dispatch(fetchTopAnimeLoading(type))
        axios.get(`https://api.jikan.moe/v3/top/anime/${page}/${type}`)
        .then((res) => {
            dispatch(fetchTopAnimeSuccess(res.data.top, type, page))
        })
        .catch((err) => {
            console.error(type + ' ' + err.message)
            dispatch(fetchTopAnimeFailed(type))
        })
    }
}

export const fetchTopAnimeLoading = (type) => ({
    type: ActionTypes.FETCH_TOP_ANIME_LOADING,
    payload: type
})

export const fetchTopAnimeSuccess = (data, type, page) => ({
    type: ActionTypes.FETCH_TOP_ANIME_SUCCESS,
    payload: { data, type, page }
})

export const fetchTopAnimeFailed = (type) => ({
    type: ActionTypes.FETCH_TOP_ANIME_ERROR,
    payload: type
})

// ---------------------------------------------------

export const fetchGenre = (genre_id, page) => (dispatch) => {
    dispatch(fetchGenreLoading(genre_id))
    axios.get(`https://api.jikan.moe/v3/genre/anime/${genre_id}/${page}`)
    .then((res) => {
        dispatch(fetchGenreSuccess(res.data.anime, genre_id, page))
    })
    .catch((err) => {
        console.error(type + ' ' + err.message)
        dispatch(fetchGenreFailed(type))
    })
}

export const fetchGenreLoading = (genre_id) => ({
    type: ActionTypes.FETCH_GENRE_LOADING,
    payload: genre_id
})

export const fetchGenreSuccess = (data, genre_id, page) => ({
    type: ActionTypes.FETCH_GENRE_SUCCESS,
    payload: { data, type: genre_id, page }
})

export const fetchGenreFailed = (genre_id) => ({
    type: ActionTypes.FETCH_GENRE_ERROR,
    payload: genre_id
})
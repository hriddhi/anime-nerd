import * as ActionTypes from './ActionTypes';

const Genre = (
    draft = [
        ['Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Mystery', 'Drama', 'Ecchi', 'Fantasy', 'Game', 'Hentai', 'Historical', 'Horror', 'Kids', 'Magic', 'Martial Arts', 'Mecha', 'Music', 'Parody', 'Samurai', 'Romance', 'School', 'Sci Fi', 'Shoujo', 'Shoujo Ai', 'Shounen', 'Shounen Ai', 'Space', 'Sports', 'Super Power', 'Vampire', 'Yaoi', 'Yuri', 'Harem', 'Slice Of Life', 'Supernatural', 'Military', 'Police', 'Psychological', 'Thriller', 'Seinen', 'Josei'],
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] },
        { loading: false, err: false, page: 0, data: [] }
    ] , action) => {
        switch(action.type){

            case ActionTypes.FETCH_GENRE_LOADING:
                var temp = [...draft]
                temp[action.payload] = {
                    ...draft[action.payload],
                    loading: true
                }

                return temp

            case ActionTypes.FETCH_GENRE_SUCCESS:
                console.log(action.payload.data)
                var temp = [...draft]
                temp[action.payload.type] = {
                    ...draft[action.payload.type],
                    loading: false,
                    page: action.payload.page,
                    data: [...draft[action.payload.type].data, ...action.payload.data]   
                }

                return temp

            case ActionTypes.FETCH_GENRE_ERROR:
                var temp = [...draft]
                temp[action.payload] = {
                    ...draft[action.payload],
                    loading: false,
                    err: true
                }

                return temp

            default:
                return draft
        }
    }


export default Genre;
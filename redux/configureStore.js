import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Search from './search'
import Auth from './auth'
import Anime from './anime'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            search: Search,
            auth: Auth,
            anime: Anime
        }), applyMiddleware(thunk)
    );

    return store;
}
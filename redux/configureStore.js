import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Search from './search';
import Auth from './auth'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            search: Search,
            auth: Auth
        }), applyMiddleware(thunk)
    );

    return store;
}
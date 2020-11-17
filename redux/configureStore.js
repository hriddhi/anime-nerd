import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Search from './search';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            search: Search
        }), applyMiddleware(thunk)
    );

    return store;
}
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Search from './search'
import Auth from './auth'
import Anime from './anime'
import Character from './character'
import Recommendation from './recommendation'
import Episode from './episode'
import List from './list'
import MAL from './mal'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'session',
    storage: AsyncStorage,
    whitelist: ['auth'],
    blacklist: ['anime','search']
};

const store = createStore(
    persistReducer(persistConfig,
        combineReducers({
            search: Search,
            auth: Auth,
            anime: Anime,
            list: List,
            character: Character,
            recommendation: Recommendation,
            episode: Episode,
            mal: MAL
        })
    ),
    applyMiddleware(thunk)
);

const persistor = persistStore(store)

export { persistor, store }
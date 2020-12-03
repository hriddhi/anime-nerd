import AsyncStorage from '@react-native-community/async-storage';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Search from './search'
import Auth from './auth'
import Anime from './anime'
import Character from './character'
import Related from './related'
import Recommendation from './recommendation'
import Episode from './episode'
import List from './list'
import MAL from './mal'
import Stats from './stats'
import Reviews from './reviews'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'session',
    storage: AsyncStorage,
    whitelist: ['auth','search'],
    blacklist: ['anime']
};

const store = createStore(
    persistReducer(persistConfig,
        combineReducers({
            search: Search,
            auth: Auth,
            anime: Anime,
            list: List,
            character: Character,
            related: Related,
            recommendation: Recommendation,
            episode: Episode,
            mal: MAL,
            stats: Stats,
            reviews: Reviews
        })
    ),
    applyMiddleware(thunk)
);

const persistor = persistStore(store)

export { persistor, store }
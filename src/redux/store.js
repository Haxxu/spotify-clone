import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '~/redux/authSlice';
import usersReducer from '~/redux/usersSlice';
import playlistReducer from '~/redux/playlistSlice';
import songsReducer from '~/redux/songsSlice';

const reducers = combineReducers({
    auth: authReducer,
    users: usersReducer,
    playlists: playlistReducer,
    songs: songsReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

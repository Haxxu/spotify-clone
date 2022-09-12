import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '~/redux/authSlice';
import userReducer from '~/redux/userSlice';
import audioPlayerReducer from '~/redux/audioPlayer';
import playlistReducer from '~/redux/playlistSlice';

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    audioPlayer: audioPlayerReducer,
    playlists: playlistReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'audioPlayer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

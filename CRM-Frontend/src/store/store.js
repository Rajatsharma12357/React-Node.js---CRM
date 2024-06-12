import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileSlice from './slices/profileSlice';

const persistConfig = {
    key: 'root',
    version:1,
    storage,
}
const reducer = combineReducers({
    auth: authSlice,
    profile: profileSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools:true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        }),
})
export default store;
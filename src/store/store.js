import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit';
import wishlistReducer from './slices/wishlistSlice';

const persistConfig = {
  key : 'root',
  storage,
  blacklist: ["register"],
}

const rootReducer = combineReducers({
  home: homeSlice,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignore non-serializable warning
        ignoredPaths: ["register"], // Ignore non-serializable state values
      },
    }),
});

export const persistor = persistStore(store); 
export default store;
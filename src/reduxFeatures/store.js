import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeeReducer from './employeeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['list'], 
};

const persistedReducer = persistReducer(persistConfig, employeeReducer);

export const store = configureStore({
  reducer: {
    employees: persistedReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().prepend(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
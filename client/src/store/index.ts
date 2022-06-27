import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/AuthSlice';
import RegisterDataReducer from './slices/RegisterDataSlice';

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        registerData: RegisterDataReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
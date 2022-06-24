import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState{
    name: string,
    email: string,
    token: string,
    isAuthenticated: boolean
}

const initialState: AuthState = {
    name: '',
    email: '',
    token: '',
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        removeAuth: (state) => {
            state.name = ''
            state.email = ''
            state.token = ''
            state.isAuthenticated = false
        }
    }
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
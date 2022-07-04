import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserInterface} from "../../Interfaces/UserInterface";

const EmptyUser: UserInterface = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    token: '',
    isAuthenticated: false,
};

const initialState: UserInterface = EmptyUser;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<UserInterface>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.address = action.payload.address;
            state.phone = action.payload.phone;
            state.isAuthenticated = true;
        },
        clearAuth: (state) => EmptyUser,
    }
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserInterface from "../../Interfaces/UserInterface";

// Create the initial state of the slice, where user is null by default
// user is not authenticated by default
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
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        removeAuth: (state) => EmptyUser,
    }
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
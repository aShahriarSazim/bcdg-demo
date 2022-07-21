import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserInterface} from "./Interfaces/UserInterface";
import axios from "../../../axios";

const EmptyUser: UserInterface = {
    loading: false,
    success: false,
    error: null,
    isAuthenticated: false,
    user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: ''
    }
};

const initialState: UserInterface = EmptyUser;

export const getAuth = createAsyncThunk('auth/getAuth', async (arg, {rejectWithValue})=>{
    const token = localStorage.getItem("access_token");
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try{
            const {data} = await axios.get('/auth/current-loggedin-user');
            return data;
        }catch(e){
            localStorage.removeItem("access_token");
            rejectWithValue(e);
        }
    }else{
        return rejectWithValue(EmptyUser.user);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.loading = false;
            state.success = false;
            state.isAuthenticated = false;
            state.error = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAuth.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getAuth.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.success = true;
            state.loading = false;
        });
        builder.addCase(getAuth.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.isAuthenticated = false;
            state.error = true;
            state.user = EmptyUser.user;
        });
    }
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;

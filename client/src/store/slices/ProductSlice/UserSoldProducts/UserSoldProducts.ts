import {allProductsInterface} from "../Interfaces/Product";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../../axios";

const initialState : allProductsInterface  = {
    loading: false,
    success: false,
    error: null,
    data: []
}

export const getUserSoldProducts = createAsyncThunk("userSoldProducts/getUserSoldProducts", async (arg: {userId: number}, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/products/user/${arg.userId}/sold`);
        return data;
    }catch(error){
        rejectWithValue(error);
    }
});

export const userSoldProductSlice = createSlice({
    name: 'userSoldProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserSoldProducts.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getUserSoldProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(getUserSoldProducts.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    },
    reducers: {
        removeSingleProductFromUserSoldProducts: (state: allProductsInterface, action: PayloadAction<number>) => {
            const newStateData = state.data.filter(product => product.id !== action.payload);
            state.data.splice(0, state.data.length);
            newStateData.forEach(product => state.data.push(product));
        }
    }
});

export const { removeSingleProductFromUserSoldProducts } = userSoldProductSlice.actions;
export default userSoldProductSlice.reducer;

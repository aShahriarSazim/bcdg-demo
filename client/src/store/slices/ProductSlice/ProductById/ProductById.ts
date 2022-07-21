import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {singleProductInterface}  from '../Interfaces/Product';
import axios from "../../../../axios";

const initialState : singleProductInterface  = {
    loading: false,
    success: false,
    error: false
};

export const getProductById = createAsyncThunk("product/getSingleProduct", async (args: {id: number}, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/products/${args.id}`);
        return data;
    }catch(error){
        rejectWithValue(error);
    }
})

export const productById = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProductById.pending, (state, action) => {
            state.loading = true;
            state.success = false;
            state.error = false;
        });
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.data = action.payload;
        });
        builder.addCase(getProductById.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = true;
        })
    },
    reducers: {

    }
});

export default productById.reducer;

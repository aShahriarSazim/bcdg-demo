import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { allProductsInterface } from '../Interfaces/Product';
import axios from "../../../../axios";

const initialState : allProductsInterface  = {
    loading: false,
    success: false,
    error: null,
    data: []
};

export const getProducts = createAsyncThunk("products/getProducts", async (arg, {rejectWithValue}) => {
    try {
        const {data} = await axios.get("/products");
        return data;
    }catch(error){
        rejectWithValue(error);
    }
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    },
    reducers: {

    }
});

export default productSlice.reducer;

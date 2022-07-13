import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import { allProductsInterface } from '../Interfaces/Product';
import axios from "../../../../axios";

const initialState : allProductsInterface  = {
    loading: false,
    success: false,
    error: null,
    data: []
};

export const getAllProducts = createAsyncThunk("products/getProducts", async (arg, {rejectWithValue}) => {
    try {
        const {data} = await axios.get("/products");
        return data;
    }catch(error){
        rejectWithValue(error);
    }
})

export const AllProductSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(getAllProducts.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    },
    reducers: {
        removeSingleProductFromAllProducts: (state: allProductsInterface, action: PayloadAction<number>) => {
            const newStateData = state.data.filter(product => product.id !== action.payload);
            state.data.splice(0, state.data.length);
            newStateData.forEach(product => state.data.push(product));
        }
    }
});

export const { removeSingleProductFromAllProducts } = AllProductSlice.actions;

export default AllProductSlice.reducer;


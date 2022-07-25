import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../../axios";

export const  getProductCategories = createAsyncThunk('/productCategories/getProductCategories', async () => {
    try {
        const {data} = await axios.get('/products/categories');
        return data;
    } catch (error) {
        return error;
    }
});

const initialState: {
    loading: boolean;
    success: boolean;
    error: boolean;
    data: any[];
} = {
    loading: false,
    success: false,
    data: [],
    error: false
}

export const productCategoriesSlice = createSlice({
    name: 'productCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductCategories.pending, (state, action) => {
           state.loading = true;
           state.success = false;
           state.error = false;
        });
        builder.addCase(getProductCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.data = action.payload;
        });
        builder.addCase(getProductCategories.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = true;
        });
    }
});

export default productCategoriesSlice.reducer;

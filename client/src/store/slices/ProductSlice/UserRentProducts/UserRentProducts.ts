import {allProductsInterface} from "../Interfaces/Product";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "../../../../axios";

const initialState : allProductsInterface  = {
    loading: false,
    success: false,
    error: null,
    data: []
}

export const getUserRentProducts = createAsyncThunk("userRentProducts/getUserRentProducts", async (arg: {userId: number}, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/products/user/${arg.userId}/rented`);
        return data;
    }catch(error){
        rejectWithValue(error);
    }
});

export const userRentProductSlice = createSlice({
    name: 'userRentProducts',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUserRentProducts.pending, (state, action) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getUserRentProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
        });
        builder.addCase(getUserRentProducts.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        })
    },
    reducers: {
        removeSingleProductFromUserRentProducts: (state: allProductsInterface, action: PayloadAction<number>) => {
            const newStateData = state.data.filter(product => product.id !== action.payload);
            state.data.splice(0, state.data.length);
            newStateData.forEach(product => state.data.push(product));
        }
    }
});

export const { removeSingleProductFromUserRentProducts } = userRentProductSlice.actions;
export default userRentProductSlice.reducer;
